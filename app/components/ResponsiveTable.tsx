export function ResponsiveTable({ children, "aria-labelledby": ariaLabelledBy, tabIndex = 0 }: { children: React.ReactNode; "aria-labelledby"?: string; tabIndex?: number }) {
  return (
    <div 
      className="w-full overflow-x-auto touch-pan-x" 
      style={{ WebkitOverflowScrolling: 'touch' }}
      role="region"
      aria-labelledby={ariaLabelledBy}
      tabIndex={tabIndex}
    >
      <div className="min-w-[600px]">
        {children}
      </div>
    </div>
  );
}
