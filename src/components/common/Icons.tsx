import type { SVGProps } from 'react';

export const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export const CubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export const DiceCountIcon = ({ count = 1, size = 18 }: { count?: 1 | 2 | 3; size?: number }) => {
  const cube = (x: number, y: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y})`}>
      <path d="M10.5 1.5 18 5.8v8.4l-7.5 4.3L3 14.2V5.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10.5 10.1 3 5.8M10.5 10.1 18 5.8M10.5 10.1v8.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

  return (
    <svg width={size * 2.2} height={size * 1.9} viewBox="0 0 48 36" fill="none" aria-hidden="true">
      {count === 1 && cube(15, 8, 'single')}
      {count === 2 && (
        <>
          {cube(5, 8, 'left')}
          {cube(23, 8, 'right')}
        </>
      )}
      {count === 3 && (
        <>
          {cube(15, 0, 'top')}
          {cube(5, 15, 'bottom-left')}
          {cube(23, 15, 'bottom-right')}
        </>
      )}
    </svg>
  );
};

export const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

export const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

export const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const PoderIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3em"} height={size || "3.4em"} viewBox="0 0 35 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.1214 4.07208C24.3978 3.47769 26.1245 3.66085 27.0872 4.77362C27.6835 5.46349 28.3695 6.08322 28.9034 6.81597C29.3906 7.48051 29.4277 8.30486 29.1958 9.09413C29.0983 9.42932 29.2114 9.49359 29.4744 9.60857C30.7938 10.1893 31.8539 11.0507 32.4698 12.4012C32.9492 13.4477 32.5925 14.3461 32.0469 15.2367C32.6588 15.7375 33.2863 16.2209 33.8807 16.7431C34.9798 17.7078 35.5274 19.793 34.2276 20.9272C30.9653 23.7744 28.0479 26.9705 24.9259 29.958C23.8229 31.0142 22.4997 31.6943 20.9173 31.8054C19.7597 31.8873 18.567 31.899 17.5302 32.546C17.119 32.8032 16.6981 33.0683 16.3551 33.4054C14.4648 35.2665 12.5959 37.1491 10.7211 39.0238C10.2339 39.511 10.0371 39.511 9.54212 39.016C6.51953 35.9934 3.49499 32.9708 0.474351 29.9463C0.355474 29.8293 0.275576 29.6754 0.158648 29.5546C-0.0693619 29.3188 -0.00310189 29.1394 0.211266 28.929C1.10187 28.0559 1.97493 27.1634 2.86553 26.2884C3.61777 25.5478 4.25502 24.7254 4.36415 23.6458C4.4421 22.8604 4.40703 22.0634 4.40118 21.2722C4.39534 20.67 4.31934 20.0659 4.33882 19.4656C4.36026 18.8381 4.46549 18.2145 4.52006 17.587C4.6974 15.5388 5.21384 13.5997 6.4104 11.8907C6.60528 11.6159 6.83329 11.3586 7.07299 11.1208C10.269 7.91701 13.4709 4.71909 16.6689 1.51916C17.2944 0.891642 18.0525 0.566182 18.9256 0.618799C19.594 0.659724 20.2332 0.848766 20.7497 1.33402C21.3616 1.90696 22.0222 2.43116 22.5971 3.03529C22.8524 3.30423 22.9518 3.72324 23.1214 4.07208ZM25.3118 20.3698C25.8438 20.2003 26.3505 20.0951 26.8104 19.8866C28.7514 19.0077 30.1721 17.4934 31.5499 15.9305C31.6103 15.8623 31.6415 15.7707 31.7039 15.7064C31.9085 15.494 31.9631 15.2543 31.7292 15.0575C31.4992 14.8645 31.2362 14.845 30.9945 15.0984C30.1974 15.9364 29.4218 16.7977 28.5799 17.5909C27.8316 18.2963 26.9878 18.8791 25.9783 19.1909C24.6999 19.5865 23.6651 19.224 23.1759 18.043C22.9265 17.4427 22.8388 16.7529 22.7979 16.0961C22.7706 15.646 22.8816 15.2173 23.3903 14.8996C25.1754 13.7829 26.7091 12.3564 28.1473 10.8247C28.3363 10.6239 28.5078 10.4056 28.6676 10.1815C28.8391 9.93793 28.8333 9.68849 28.5741 9.51115C28.3285 9.33966 28.1161 9.38449 27.9096 9.63004C27.5315 10.0822 27.1456 10.5284 26.7227 10.9357C26.0329 11.5983 25.3235 12.2414 24.5985 12.8689C24.1932 13.2197 23.743 13.5179 23.2344 13.8979C23.3533 12.4032 22.7063 11.4736 21.5292 10.8207C20.8802 10.4622 20.28 10.014 19.748 9.66513C20.5002 8.94797 21.2758 8.30095 21.9404 7.55456C22.5913 6.82181 23.0493 5.95653 23.059 4.92367C23.0629 4.65668 23.0824 4.44038 22.6926 4.43843C22.3223 4.43453 22.1918 4.58653 22.1119 4.92367C22.0066 5.37384 21.8878 5.83378 21.6851 6.24497C21.1433 7.34799 20.2274 8.09439 19.2043 8.7414C18.8691 8.95187 18.6333 8.98109 18.3039 8.74919C17.4796 8.1665 16.6007 7.62861 15.5503 7.74749C14.8409 7.82544 14.1413 8.06123 13.4592 8.29119C12.0483 8.76864 10.6549 9.29677 9.24785 9.78591C8.9146 9.90089 8.83275 10.1367 8.94773 10.39C9.04907 10.6141 9.23421 10.8071 9.57915 10.6804C11.2746 10.0568 12.9818 9.46634 14.6772 8.84077C15.6165 8.49194 16.4623 8.6868 17.2691 9.19934C18.6079 10.049 19.9351 10.9201 21.2856 11.7542C22.1177 12.2687 22.4159 13.0014 22.3068 13.9369C22.2191 14.693 21.7436 15.1588 21.0868 15.4453C20.1416 15.8584 19.1419 15.7941 18.1967 15.5349C17.0957 15.2348 16.0355 14.7749 14.9617 14.3754C14.7025 14.2799 14.4706 14.2058 14.2796 14.5001C14.0965 14.7807 14.268 14.9483 14.4239 15.1646C15.102 16.1 15.8328 17.0102 16.4116 18.006C17.4581 19.8008 18.074 21.7574 18.2844 23.8348C18.3117 24.1018 18.4053 24.3298 18.7697 24.3103C19.1127 24.2908 19.2393 24.1252 19.216 23.8095C19.1906 23.4743 19.1809 23.1333 19.1166 22.8039C18.7463 20.9448 18.1831 19.1518 17.2321 17.4973C16.9631 17.0316 16.6806 16.5716 16.3473 16.0104C18.2084 16.5911 19.9877 16.9946 21.7981 16.217C21.8507 16.5152 21.8975 16.7529 21.9326 16.9945C22.1275 18.3587 22.6361 19.5046 23.9964 20.1009C24.1562 20.1691 24.3082 20.3738 24.3588 20.5472C24.507 21.0519 24.5518 21.5917 24.7272 22.0828C25.4891 24.207 27.2626 24.9008 29.2425 24.2947C29.5251 24.209 29.6908 23.9966 29.5933 23.7023C29.4939 23.4081 29.2776 23.3496 28.9463 23.4061C28.426 23.4938 27.8706 23.5757 27.3619 23.4841C26.0329 23.2502 25.3021 21.621 25.3118 20.3698Z" />
  </svg>
);

export const HabilidadeIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3em"} height={size || "3.4em"} viewBox="0 0 35 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.8146 14.8662H23.2904C25.0699 14.8662 26.8493 14.8571 28.6288 14.8717C29.2031 14.8771 29.6644 15.0868 29.7409 15.6866C29.7974 16.1224 29.5622 16.3959 29.3034 16.6566C28.7655 17.1999 28.1967 17.7122 27.6552 18.2519C21.1518 24.7498 14.6503 31.2513 8.14877 37.751C7.53982 38.36 6.84882 38.2415 6.56258 37.4466C6.49148 37.2442 6.54253 36.9488 6.63733 36.7428C7.39761 35.0709 8.18159 33.41 8.95827 31.7472C10.0577 29.3971 11.1607 27.0488 12.2546 24.6969C12.8508 23.4207 13.4324 22.1371 14.0322 20.8317H6.50424C6.28728 20.8317 6.07032 20.8299 5.85154 20.8281C5.48507 20.8262 5.21888 20.6767 5.03109 20.3467C4.83419 20.004 4.86154 19.705 5.06938 19.3804C6.18883 17.652 7.29915 15.92 8.41131 14.1861C10.3293 11.1961 12.2473 8.20244 14.1653 5.21057C14.7579 4.28803 15.3595 3.36909 15.9375 2.43744C16.1873 2.03268 16.5136 1.85952 16.9913 1.86134C20.9732 1.87046 24.955 1.86861 28.9369 1.86496C29.369 1.86496 29.8029 1.90873 30.0053 2.33901C30.1803 2.71459 30.111 3.08103 29.8704 3.46755C28.1073 6.28804 26.3771 9.12678 24.6305 11.9582C24.0452 12.9081 23.4491 13.8525 22.8146 14.8662Z" />
  </svg>
);

export const ResistenciaIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3em"} height={size || "3.4em"} viewBox="0 0 35 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4914 38.1374H17.4203C15.65 37.1273 13.8978 36.0844 12.3098 34.7954C11.4328 34.0843 10.5558 33.3678 9.73172 32.5947C9.04801 31.9529 8.4117 31.2528 7.81003 30.5326C7.07526 29.652 6.36602 28.7459 5.70601 27.8106C4.86185 26.6145 4.18542 25.3218 3.62204 23.9672C2.81982 22.0345 2.31661 20.0435 2.31478 17.9413C2.31296 14.211 2.30931 10.4825 2.30566 6.75393V6.34553C3.78978 5.89884 5.22832 5.46671 6.66686 5.03096C10.0016 4.01906 13.3363 3.0108 16.6673 1.98796C17.1924 1.82752 17.692 1.81479 18.2207 1.97705C20.9793 2.82668 23.7415 3.65806 26.5019 4.49675C28.5512 5.11848 30.5987 5.74203 32.659 6.3674C32.6644 6.40933 32.6772 6.45491 32.6754 6.50049C32.6061 10.6721 32.8285 14.8455 32.5496 19.0116C32.5076 19.6114 32.4675 20.2204 32.329 20.802C31.9278 22.4812 31.3499 24.093 30.544 25.6336C29.4081 27.7978 27.955 29.7249 26.2886 31.4916C25.5793 32.2428 24.8154 32.9484 24.0241 33.6121C23.0323 34.4435 22.0167 35.2585 20.9519 35.9914C19.8361 36.7608 18.6474 37.4263 17.4914 38.1374ZM17.475 4.18683C17.4294 4.18501 17.4039 4.17585 17.382 4.18132C14.9899 4.9088 12.6015 5.63995 10.2076 6.36378C8.45363 6.89617 6.6942 7.4158 4.93842 7.94454C4.77069 7.99559 4.60112 8.01017 4.5993 8.28912C4.59748 11.5855 4.56466 14.8838 4.57195 18.182C4.57195 18.8147 4.62483 19.4692 4.79257 20.0745C5.12622 21.2797 5.47081 22.494 5.96673 23.6372C6.93122 25.8615 8.34424 27.8123 9.98515 29.5882C10.6324 30.2883 11.3234 30.9575 12.0491 31.5755C13.0427 32.4234 14.0729 33.2347 15.123 34.0132C15.8615 34.5601 16.6582 35.0287 17.475 35.5611V4.18683Z" />
  </svg>
);

export const ChevronUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

export const ChevronDownIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

export const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

export const VolumeXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

export const BookIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export const CrownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

export const TriangleDownIcon = ({ size = 10, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block' }}>
    <polygon points="4 8 20 8 12 18" />
  </svg>
);

export const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

export const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16"/>
    <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
    <path d="M2 17h20"/>
    <path d="M6 8v9"/>
  </svg>
);

export const ZapIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

export const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const MaskIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M320 96c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c17.7 0 32 14.3 32 32zM160 256a40 40 0 1 1 -80 0 40 40 0 1 1 80 0zm272 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM32 32C14.3 32 0 46.3 0 64V224c0 123.7 100.3 224 224 224h64c123.7 0 224-100.3 224-224V64c0-17.7-14.3-32-32-32H32zm80 96a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm256 144a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"/>
  </svg>
);

export const SparklesIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M316.9 18.4C311.6 7.6 300.7 0 288.5 0s-23.1 7.6-28.4 18.4L214.6 112 121 157.5c-10.8 5.3-18.4 16.2-18.4 28.4s7.6 23.1 18.4 28.4L214.6 260l45.5 93.6c5.3 10.8 16.2 18.4 28.4 18.4s23.1-7.6 28.4-18.4L362.4 260l93.6-45.5c10.8-5.3 18.4-16.2 18.4-28.4s-7.6-23.1-18.4-28.4L362.4 112 316.9 18.4zM18.4 260.1C7.6 265.4 0 276.3 0 288.5s7.6 23.1 18.4 28.4L80 346.9l29.9 61.6C115.2 419.3 126.1 427 138.3 427s23.1-7.6 28.4-18.4l29.9-61.6 61.6-29.9c10.8-5.3 18.4-16.2 18.4-28.4s-7.6-23.1-18.4-28.4l-61.6-29.9-29.9-61.6C161.4 157.6 150.5 150 138.3 150s-23.1 7.6-28.4 18.4L80 230.2 18.4 260.1zM352 352l-24.6 50.7L276.7 427c-10.8 5.3-18.4 16.2-18.4 28.4s7.6 23.1 18.4 28.4l50.7 24.6L352 559.1c5.3 10.8 16.2 18.4 28.4 18.4s23.1-7.6 28.4-18.4l24.6-50.7 50.7-24.6c10.8-5.3 18.4-16.2 18.4-28.4s-7.6-23.1-18.4-28.4l-50.7-24.6L408.9 352c-5.3-10.8-16.2-18.4-28.4-18.4s-23.1 7.6-28.4 18.4z" transform="scale(0.82) translate(56 -28)"/>
  </svg>
);

export const SkillsIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M78.6 5C87.1-3.5 100.9-3.5 109.4 5L160 55.7 206.1 9.6c8.5-8.5 22.3-8.5 30.8 0s8.5 22.3 0 30.8L190.7 86.6 336 232 441.4 126.6l-46.1-46.1c-8.5-8.5-8.5-22.3 0-30.8s22.3-8.5 30.8 0L472 95.7 502.6 65c8.5-8.5 22.3-8.5 30.8 0s8.5 22.3 0 30.8L502.3 126.9 548.4 173c8.5 8.5 8.5 22.3 0 30.8s-22.3 8.5-30.8 0L471.5 157.7 366.1 263.1 511.5 408.6l46.1-46.1c8.5-8.5 22.3-8.5 30.8 0s8.5 22.3 0 30.8L542.3 439.4 593 490.1c8.5 8.5 8.5 22.3 0 30.8s-22.3 8.5-30.8 0L511.5 470.3 465.4 516.4c-8.5 8.5-22.3 8.5-30.8 0s-8.5-22.3 0-30.8l46.1-46.1L335.3 294 229.9 399.4l46.1 46.1c8.5 8.5 8.5 22.3 0 30.8s-22.3 8.5-30.8 0L199.1 430.3 148.4 481c-8.5 8.5-22.3 8.5-30.8 0s-8.5-22.3 0-30.8l50.7-50.7L122.2 353.4c-8.5-8.5-8.5-22.3 0-30.8s22.3-8.5 30.8 0l46.1 46.1L304.5 263.3 159.1 117.9 113 164c-8.5 8.5-22.3 8.5-30.8 0s-8.5-22.3 0-30.8l46.1-46.1L77.6 36.4c-8.5-8.5-8.5-22.3 0-30.8z" transform="scale(0.72) translate(-40 70)"/>
  </svg>
);

export const WandSparklesIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">
    <path d="M384 32c0-17.7 14.3-32 32-32s32 14.3 32 32V96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H448v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h64V32zM32 192c17.7 0 32 14.3 32 32v35.3l86.1 86.1 52.7-52.7c12.5-12.5 32.8-12.5 45.3 0l35.3 35.3L425.4 186.1c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L328.7 373.3l35.3 35.3c12.5 12.5 12.5 32.8 0 45.3l-52.7 52.7 86.1 86.1H432c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32s32 14.3 32 32v34.7l45.5-45.5L77.4 181.1C64.9 168.6 64.9 148.3 77.4 135.8S110.2 123.3 122.7 135.8L256 269.1 308.7 216.4 173.3 81.1C160.8 68.6 160.8 48.3 173.3 35.8s32.8-12.5 45.3 0L354 171.1l52.7-52.7c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L399.3 216.4 534.6 351.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L354 261.7l-52.7 52.7L434.6 448H469c17.7 0 32 14.3 32 32s-14.3 32-32 32H261c-17.7 0-32-14.3-32-32V272c0-17.7 14.3-32 32-32s32 14.3 32 32v34.7l45.5-45.5L122.7 45.4C110.2 32.9 89.9 32.9 77.4 45.4S64.9 78.2 77.4 90.7L212.7 226 160 278.7 26.7 145.4C14.2 132.9-6.1 132.9-18.6 145.4S-31.1 178.2-18.6 190.7L32 241.3V224c0-17.7 14.3-32 32-32z" transform="scale(0.7) translate(70 70)"/>
  </svg>
);

export const TransformIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
  </svg>
);

export const LeafIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c4 0 9 2 9 7a7 7 0 0 1-7 7z"/>
    <path d="M11 20v-7"/>
  </svg>
);

export const ArrowLeftIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export const TabConceptIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-16.7c-22.2 10.3-46.9 16-72.9 16s-50.6-5.7-72.9-16h-16.7C60.2 288 0 348.2 0 422.4C0 455.3 26.7 482 59.6 482H388.4c32.9 0 59.6-26.7 59.6-59.6C448 348.2 387.8 288 313.6 288z"/>
  </svg>
);

export const TabAttributesIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
    <path d="M32 32C14.3 32 0 46.3 0 64V384c0 17.7 14.3 32 32 32H128c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32zm128 0c-17.7 0-32 14.3-32 32V384c0 17.7 14.3 32 32 32H256c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H160zm128 0c-17.7 0-32 14.3-32 32V384c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H288z"/>
  </svg>
);

export const TabAdvantagesIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
    <path d="M331.8 177.1c-2.2-3.4-5.9-5.5-9.9-5.5H190.5l-40.3-123C148.5 40.5 141 35.2 132.9 35.2s-15.7 5.3-17.3 13.4L75.3 171.6H-56c-4 0-7.7 2.1-9.9 5.5s-2.5 7.6-.7 11.3l106.3 201.7c3.2 6 9.4 9.8 16.2 9.8s13-3.8 16.2-9.8L178.2 240l106.3 150.1c3.2 6 9.4 9.8 16.2 9.8s13-3.8 16.2-9.8L423.2 188.4c1.8-3.7 1.5-7.9-.7-11.3z"/>
  </svg>
);

export const TabDisadvantagesIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
  </svg>
);

export const TabSkillsIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
    <path d="M288 32c17.7 0 32 14.3 32 32V96h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320v32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V256H224v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V256H64c-17.7 0-32-14.3-32-32s14.3-32 32-32H160V160H64c-17.7 0-32-14.3-32-32S46.3 96 64 96h96V64c0-17.7 14.3-32 32-32s32 14.3 32 32V96h32V64c0-17.7 14.3-32 32-32z"/>
  </svg>
);

export const TabTechniquesIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M160 32c12.4 0 23.8 6.9 29.4 17.9L256 176 322.6 49.9C328.2 38.9 339.6 32 352 32c11.3 0 21.8 5.9 27.6 15.6l96 160c6 10 5.8 22.5-.3 32.3S458.6 256 448 256H310.4l-75.3 142.1C229.4 409 218.1 416 206.4 416s-23-7-28.7-17.9L118.4 288H32c-11.3 0-21.8-5.9-27.6-15.6s-6-22.3-.3-32.3l96-160C105.8 37.9 116.4 32 128 32h32z"/>
  </svg>
);

export const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

export const SvgIcon = (props: SVGProps<SVGSVGElement>) => <svg {...props} />;

export const HourglassIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
);

export const CrystalBallIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="7" />
    <path d="M14.5 7.5a3.5 3.5 0 0 0-5 0" />
    <path d="M8 21h8" />
    <path d="M10 17h4" />
  </svg>
);

export const SquareIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

export const CheckSquareIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
