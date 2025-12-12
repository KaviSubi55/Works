'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';

const ConditionalHeader = () => {
  const pathname = usePathname();

  // Don't render Header on home page (it has SecondaryNav with UserMenu/Cart)
  if (pathname === '/') {
    return null;
  }

  return <Header />;
};

export default ConditionalHeader;
