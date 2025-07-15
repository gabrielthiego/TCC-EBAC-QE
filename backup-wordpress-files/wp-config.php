<?php
/**
 * The base configuration for WordPress
 *
 * This file contains the configurations for database, authentication keys,
 * table prefix, and other settings.
 *
 * @package WordPress
 */

// Helper function para pegar variáveis de ambiente no Docker
if (!function_exists('getenv_docker')) {
    function getenv_docker($env, $default) {
        if ($fileEnv = getenv($env . '_FILE')) {
            return rtrim(file_get_contents($fileEnv), "\r\n");
        } elseif (($val = getenv($env)) !== false) {
            return $val;
        } else {
            return $default;
        }
    }
}

// Database settings
define('DB_NAME', getenv_docker('WORDPRESS_DB_NAME', 'wordpress'));
define('DB_USER', getenv_docker('WORDPRESS_DB_USER', 'example username'));
define('DB_PASSWORD', getenv_docker('WORDPRESS_DB_PASSWORD', 'example password'));
define('DB_HOST', getenv_docker('WORDPRESS_DB_HOST', 'mysql'));
define('DB_CHARSET', getenv_docker('WORDPRESS_DB_CHARSET', 'utf8'));
define('DB_COLLATE', getenv_docker('WORDPRESS_DB_COLLATE', ''));

// Authentication Unique Keys and Salts
define('AUTH_KEY', getenv_docker('WORDPRESS_AUTH_KEY', 'dcfe2e06a303a7e8dfee56f1f23aad59711d0076'));
define('SECURE_AUTH_KEY', getenv_docker('WORDPRESS_SECURE_AUTH_KEY', '0b46be314c4650af634b187000195021f42ec0a7'));
define('LOGGED_IN_KEY', getenv_docker('WORDPRESS_LOGGED_IN_KEY', '7763413571e55a8624a0a69d2942a13264559c4d'));
define('NONCE_KEY', getenv_docker('WORDPRESS_NONCE_KEY', 'bd22d54d8ef9a8d588ff6940b150dd9f9fe652a2'));
define('AUTH_SALT', getenv_docker('WORDPRESS_AUTH_SALT', 'd19c0b09001040b54fb0b6fc77ba03f83a186f9f'));
define('SECURE_AUTH_SALT', getenv_docker('WORDPRESS_SECURE_AUTH_SALT', 'ee3614c7002fb6d52edf319c47686aa338d96657'));
define('LOGGED_IN_SALT', getenv_docker('WORDPRESS_LOGGED_IN_SALT', '9a7c3abf768599665760caadbb9f19dbb825d617'));
define('NONCE_SALT', getenv_docker('WORDPRESS_NONCE_SALT', 'bc463398e451a10fa057f3ce7acb78e911ab6702'));

// Table prefix
$table_prefix = getenv_docker('WORDPRESS_TABLE_PREFIX', 'wp_');

// Debug mode
define('WP_DEBUG', !!getenv_docker('WORDPRESS_DEBUG', ''));

// JWT Auth secret key — IMPORTANTE: só UMA vez e ANTES do require_once
define('JWT_AUTH_SECRET_KEY', 'ck_6d168c71248bdc44dc270d1c37b7bd47299a76d8');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';