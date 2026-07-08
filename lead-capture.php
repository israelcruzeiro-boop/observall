<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 20000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_body']);
    exit;
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

function field_text(array $payload, string $group, string $field): string
{
    $value = $payload[$group][$field] ?? '';
    return trim(substr((string) $value, 0, 180));
}

$lead = [
    'nome' => field_text($payload, 'lead', 'nome'),
    'empresa' => field_text($payload, 'lead', 'empresa'),
    'whatsapp' => field_text($payload, 'lead', 'whatsapp'),
    'email' => field_text($payload, 'lead', 'email'),
];

foreach ($lead as $value) {
    if ($value === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'missing_lead_fields']);
        exit;
    }
}

$record = [
    'id' => bin2hex(random_bytes(8)),
    'source' => 'observall-site-roi',
    'createdAt' => gmdate('c'),
    'lead' => $lead,
    'simulation' => $payload['simulation'] ?? [],
    'client' => [
        'ipHash' => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? ''),
        'userAgent' => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 240),
    ],
];

$storageDir = __DIR__ . DIRECTORY_SEPARATOR . 'storage';
if (!is_dir($storageDir) && !mkdir($storageDir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'storage_unavailable']);
    exit;
}

$file = $storageDir . DIRECTORY_SEPARATOR . 'roi-leads.jsonl';
$line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;

if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'write_failed']);
    exit;
}

echo json_encode(['ok' => true]);
