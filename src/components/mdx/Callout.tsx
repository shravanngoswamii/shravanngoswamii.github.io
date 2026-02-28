import type { ReactNode } from "react";
import { TbInfoCircle, TbAlertTriangle, TbBulb, TbFlame } from "react-icons/tb";

interface Props {
  type?: "note" | "warning" | "insight" | "important";
  title?: string;
  position?: "left" | "inline";
  children: ReactNode;
}

const config = {
  note: {
    icon: TbInfoCircle,
    border: "border-l-blue-500",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-500",
    defaultTitle: "Note",
  },
  warning: {
    icon: TbAlertTriangle,
    border: "border-l-amber-500",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-500",
    defaultTitle: "Warning",
  },
  insight: {
    icon: TbBulb,
    border: "border-l-violet-500",
    bg: "bg-violet-500/5",
    iconColor: "text-violet-500",
    defaultTitle: "Insight",
  },
  important: {
    icon: TbFlame,
    border: "border-l-red-500",
    bg: "bg-red-500/5",
    iconColor: "text-red-500",
    defaultTitle: "Important",
  },
};

export default function Callout({
  type = "note",
  title,
  position = "inline",
  children,
}: Props) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div
      className={`not-prose my-6 rounded-sm border border-skin-line/20 border-l-[3px] ${c.border} ${c.bg} p-5`}
      data-position={position}
      data-component="callout"
      data-callout-type={type}
      data-callout-title={title || c.defaultTitle}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${c.iconColor}`} />
        <span className="font-mono text-[11px] uppercase tracking-widest font-medium text-skin-base/70">
          {title || c.defaultTitle}
        </span>
      </div>
      <div className="text-sm text-skin-base/80 leading-relaxed text-justify [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
