export default function IosStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2.5 pb-1">
      <span style={{ fontSize: '13px', fontWeight: '600' }}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="8" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/>
          <rect x="9" y="3" width="3" height="9" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.5" fill="white"/>
          <path d="M4.8 7.8C5.9 6.7 6.9 6.2 8 6.2s2.1.5 3.2 1.6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M2 5C3.8 3.1 5.8 2 8 2s4.2 1.1 6 3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.4"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
          <path d="M23 4.5v3a1.5 1.5 0 000-3z" fill="white" fillOpacity="0.45"/>
        </svg>
      </div>
    </div>
  );
}
