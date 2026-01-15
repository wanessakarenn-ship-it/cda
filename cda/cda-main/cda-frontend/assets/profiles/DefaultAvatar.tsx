import React from 'react';

interface DefaultAvatarProps {
  name: string;
  size?: string;
}

export const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ name, size = "w-10 h-10" }) => {
  // Extrai iniciais (Ex: "Ana García" -> "AG")
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`${size} rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm`}>
      <span className="text-indigo-600 font-bold text-xs tracking-tighter">
        {initials}
      </span>
    </div>
  );
};