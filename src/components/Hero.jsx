// src/components/Hero.jsx
// Hero 组件 - 柴火基地车：兼顾酷炫外形与核心功能
// Hero Component - Chaihuo MCV: Cool vehicle + Core capabilities

import React from 'react';

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center relative overflow-hidden bg-base-100"
        >
            <div className="container mx-auto max-w-7xl px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* 左侧：文字内容 */}
                    <div className="order-2 lg:order-1 relative z-10">
                        {/* 项目名称 + 多色大标题 */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                            <span className="text-base-content font-tech text-6xl">柴火</span>
                            <span className="text-chaihuo font-tech">基地车</span>
                            <br />
                            <span className="text-tech-blue text-4xl md:text-5xl">移动 AI 实验室</span>
                        </h1>

                        {/* 简洁副标题 - 强调解决方案 */}
                        <p className="text-xl md:text-2xl text-base-content/70 mb-6 leading-relaxed max-w-xl">
                            集成<strong className="text-chaihuo">空间智能</strong>、
                            <strong className="text-tech-blue">AI 交互</strong>与
                            <strong className="text-earth">数字制造</strong>的
                            完整开源方案。
                        </p>

                        {/* 四大核心能力标签 */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="px-4 py-2 bg-chaihuo/10 text-chaihuo rounded-full text-sm font-medium">
                                🤖 AI 视觉与交互
                            </span>
                            <span className="px-4 py-2 bg-tech-blue/10 text-tech-blue rounded-full text-sm font-medium">
                                🔧 数字制造设备
                            </span>
                            <span className="px-4 py-2 bg-earth/10 text-earth rounded-full text-sm font-medium">
                                📚 L1-L3 培训课程
                            </span>
                            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                                🌐 全栈开源方案
                            </span>
                        </div>

                        {/* CTA 区域 */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#intro"
                                className="btn btn-primary btn-lg text-lg px-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                探索完整方案
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                            <a
                                href="#opensource"
                                className="link-arrow text-lg text-base-content/70 hover:text-chaihuo transition-colors py-3"
                            >
                                查看开源内容
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* 右侧：房车图片 + 浮动能力卡 */}
                    <div className="order-1 lg:order-2 relative">
                        {/* 主图：房车 */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="/vancar-hero.png"
                                alt="柴火基地车 - 移动AI教学实验室"
                                className="w-full h-auto object-cover"
                            />
                            {/* 图片上的渐变遮罩 */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* 错落有致的浮动能力卡片 - 3个卡片形成动态层次布局 */}

                        {/* 卡片1 - 右上角，微微右倾 */}
                        <div
                            className="absolute -top-6 right-2 bg-base-100/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-base-300 animate-float hidden lg:block z-30"
                            style={{ transform: 'rotate(3deg)' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-chaihuo/20 to-chaihuo/5 flex items-center justify-center shadow-inner">
                                    <span className="text-2xl">🧠</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-base-content">空间智能</div>
                                    <div className="text-xs text-base-content/60">设备间自动化</div>
                                </div>
                            </div>
                        </div>

                        {/* 卡片2 - 左侧中偏下，微微左倾 */}
                        <div
                            className="absolute top-1/2 -left-8 bg-base-100/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-base-300 animate-float-delayed hidden lg:block z-20"
                            style={{ transform: 'translateY(-50%) rotate(-2deg)' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-tech-blue/20 to-tech-blue/5 flex items-center justify-center shadow-inner">
                                    <span className="text-2xl">🔓</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-base-content">完全开源</div>
                                    <div className="text-xs text-base-content/60">硬件·软件·文档</div>
                                </div>
                            </div>
                        </div>

                        {/* 卡片3 - 右下角，略微右倾 */}
                        <div
                            className="absolute -bottom-6 right-8 bg-base-100/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-base-300 animate-float hidden lg:block z-30"
                            style={{ transform: 'rotate(2deg)', animationDelay: '1s' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-earth/20 to-earth/5 flex items-center justify-center shadow-inner">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-base-content">L1-L3 课程</div>
                                    <div className="text-xs text-base-content/60">标准化培训</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 向下滚动指示器 */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
