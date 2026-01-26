# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# 复制构建产物
COPY --from=builder /app/dist ./dist

# 兜底：如果 standalone 模式仍需要部分运行时依赖，则安装生产依赖
# 注：根据 @astrojs/node 文档，standalone 应该自包含，但为安全起见保留此行
# 如果镜像体积过大，可以尝试移除以下两行
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts || echo "No production deps needed"

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]
