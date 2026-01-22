/// <reference types="astro/client" />

// Cloudflare Workers runtime 类型定义
// Type definitions for Cloudflare Workers runtime
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
    interface Locals extends Runtime {
        runtime: {
            env: {
                CLARITY_ID?: string;
            };
        };
    }
}

// Cloudflare Workers 环境变量类型
// Cloudflare Workers environment variables type
interface Env {
    CLARITY_ID?: string;
}
