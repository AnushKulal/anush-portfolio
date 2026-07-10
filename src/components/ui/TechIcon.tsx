'use client';

import type { IconType } from 'react-icons';
import {
  SiFigma,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiOpenjdk,
  SiPython,
  SiNodedotjs,
  SiGit,
  SiMysql,
  SiCplusplus,
  SiSharp,
} from 'react-icons/si';
import { TbBrandFigma, TbApi } from 'react-icons/tb';
import { LuPenTool, LuLayoutDashboard, LuPaintbrush } from 'react-icons/lu';

/**
 * Central registry mapping a tech key to a real vector brand/UI icon.
 * Replaces emoji-as-icons for a professional, consistent look.
 */
const REGISTRY: Record<string, IconType> = {
  figma: SiFigma,
  react: SiReact,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  java: SiOpenjdk,
  python: SiPython,
  node: SiNodedotjs,
  git: SiGit,
  sql: SiMysql,
  canva: LuPaintbrush,
  cpp: SiCplusplus,
  csharp: SiSharp,
  api: TbApi,
  design: LuPenTool,
  dashboard: LuLayoutDashboard,
  prototype: TbBrandFigma,
};

export default function TechIcon({
  name,
  size = 30,
  color,
  style,
}: {
  name: keyof typeof REGISTRY | string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const Cmp = REGISTRY[name] ?? LuLayoutDashboard;
  return <Cmp size={size} color={color} style={style} aria-hidden />;
}
