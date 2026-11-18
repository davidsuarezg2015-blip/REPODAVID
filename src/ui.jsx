import { Cloud, Droplet, Flame, Scale, Sprout } from 'lucide-react';

const phaseIcons = {
  negacion: Cloud,
  ira: Flame,
  pacto: Scale,
  tristeza: Droplet,
  aceptacion: Sprout,
};

export function phaseStyle(phase) {
  return { '--phase-color': phase.color, '--phase-tint': phase.tint };
}

export function PhaseIcon({ phase, className = '' }) {
  const Icon = phaseIcons[phase.id];
  return (
    <span className={`phase-icon ${className}`} style={phaseStyle(phase)} aria-hidden="true">
      <Icon size={22} strokeWidth={1.7} />
    </span>
  );
}

export function Brand({ compact = false }) {
  return (
    <a href="#inicio" className={`brand${compact ? ' brand--compact' : ''}`} aria-label="Alivio, inicio">
      <span className="brand-mark" aria-hidden="true"><Sprout size={23} strokeWidth={1.65} /></span>
      <span className="brand-copy">
        <span className="brand-name">Alivio</span>
        {!compact && <span className="brand-caption">GUÍA DE DUELO</span>}
      </span>
    </a>
  );
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
