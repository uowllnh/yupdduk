import clsx from "clsx";
import Image from "next/image";

type SocialLoginButtonProps = {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "kakao" | "naver" | "google";
  color?: string;
};

export default function SocialLoginButton({
  icon,
  label,
  onClick,
  disabled = false,
  variant = "default",
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={clsx(
        "flex h-14 w-14 items-center justify-center rounded-full",
        "transition disabled:opacity-60",
        variant === "google" && "border border-gray-200 bg-white",
        variant === "kakao" && "bg-[#FEE500]",
        variant === "naver" && "bg-[#03C75A]",
      )}
    >
      <Image src={icon} alt="" width={20} height={20} />
    </button>
  );
}
