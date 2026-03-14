export function DallahLogo({ size = 40 }: { size?: number }) {
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      aria-label="كيف الضيافة - شعار"
    >
      <img 
        src="/icons/logo-1.svg" 
        alt="كيف الضيافة" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain' 
        }} 
      />
    </div>
  );
}
