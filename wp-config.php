<?php

if (!function_exists('getenv_docker')) {
    function getenv_docker($env, $default) {
        if ($fileEnv = getenv($env . '_FILE')) {
            return rtrim(file_get_contents($fileEnv), "\r\n");
        } else if (($val = getenv($env)) !== false) {
            return $val;
        } else {
            return $default;
        }
    }
}

// ** Database settings ** //
define( 'DB_NAME', getenv_docker('WORDPRESS_DB_NAME', 'wordpress') );
define( 'DB_USER', getenv_docker('WORDPRESS_DB_USER', 'example username') );
define( 'DB_PASSWORD', getenv_docker('WORDPRESS_DB_PASSWORD', 'example password') );
define( 'DB_HOST', getenv_docker('WORDPRESS_DB_HOST', 'mysql') );
define( 'DB_CHARSET', getenv_docker('WORDPRESS_DB_CHARSET', 'utf8') );
define( 'DB_COLLATE', getenv_docker('WORDPRESS_DB_COLLATE', '') );

// ** Authentication unique keys and salts ** //
define( 'AUTH_KEY',         getenv_docker('WORDPRESS_AUTH_KEY',         'f6ca814a6236d6fe167051dbb4eae3739d43731f') );
define( 'SECURE_AUTH_KEY',  getenv_docker('WORDPRESS_SECURE_AUTH_KEY',  'b4d801af0d46a31ec304ebe04d1d35f7d0a84322') );
define( 'LOGGED_IN_KEY',    getenv_docker('WORDPRESS_LOGGED_IN_KEY',    '949f73d2bd65a5f35facfdb6c5b7220ff10a4dee') );
define( 'NONCE_KEY',        getenv_docker('WORDPRESS_NONCE_KEY',        'e98acc6d1b25fe17aecb92977e3854804d78c7c5') );
define( 'AUTH_SALT',        getenv_docker('WORDPRESS_AUTH_SALT',        '3955ddff7bb3f5185600b1f6cef1ccfb08711052') );
define( 'SECURE_AUTH_SALT', getenv_docker('WORDPRESS_SECURE_AUTH_SALT', 'febf0a73501d217fddd7850602b8c64e5759266f') );
define( 'LOGGED_IN_SALT',   getenv_docker('WORDPRESS_LOGGED_IN_SALT',   'f0f78ba085938a6c65515c893a7a4ff47636242b') );
define( 'NONCE_SALT',       getenv_docker('WORDPRESS_NONCE_SALT',       '0b9d5c1c69ec35075d94b7c8bf5e56aef32985d9') );

// ** Table prefix ** //
$table_prefix = getenv_docker('WORDPRESS_TABLE_PREFIX', 'wp_');

// ** Debug mode ** //
define( 'WP_DEBUG', !!getenv_docker('WORDPRESS_DEBUG', '') );

// ** JWT Config ** //
define('JWT_AUTH_SECRET_KEY', 'ck_a9f597dc1a6042c1cab53d60660d61d7ed395940');
define('JWT_AUTH_CORS_ENABLE', true);

// ** HTTPS behind proxy ** //
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
    $_SERVER['HTTPS'] = 'on';
}

if ($configExtra = getenv_docker('WORDPRESS_CONFIG_EXTRA', '')) {
    eval($configExtra);
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';