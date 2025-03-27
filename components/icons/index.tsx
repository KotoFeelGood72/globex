import { 
  Building2, 
  ShieldCheck, 
  Banknote, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export function IconBank(props: React.ComponentProps<typeof Building2>) {
  return <Building2 {...props} />;
}

export function IconShield(props: React.ComponentProps<typeof ShieldCheck>) {
  return <ShieldCheck {...props} />;
}

export function IconFast(props: React.ComponentProps<typeof Banknote>) {
  return <Banknote {...props} />;
}

export function IconPiggy(props: React.ComponentProps<typeof PiggyBank>) {
  return <PiggyBank {...props} />;
}

export function IconArrowUpRight(props: React.ComponentProps<typeof ArrowUpRight>) {
  return <ArrowUpRight {...props} />;
}

export function IconArrowDownRight(props: React.ComponentProps<typeof ArrowDownRight>) {
  return <ArrowDownRight {...props} />;
}

export function IconArrowRight(props: React.ComponentProps<typeof ArrowRight>) {
  return <ArrowRight {...props} />;
}

export function IconChevronDown(props: React.ComponentProps<typeof ChevronDown>) {
  return <ChevronDown {...props} />;
}

export function IconChevronUp(props: React.ComponentProps<typeof ChevronUp>) {
  return <ChevronUp {...props} />;
}

export function IconSuccess(props: React.ComponentProps<typeof CheckCircle2>) {
  return <CheckCircle2 {...props} />;
}

export function IconError(props: React.ComponentProps<typeof XCircle>) {
  return <XCircle {...props} />;
}

export function IconWarning(props: React.ComponentProps<typeof AlertCircle>) {
  return <AlertCircle {...props} />;
}

export function IconLoader(props: React.ComponentProps<typeof Loader2>) {
  return <Loader2 {...props} />;
}
