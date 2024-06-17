// --- style
import style from '@/src/app/layouts.module.css';
// --- components
import PathSegment from '@/src/UI/PathSegment/PathSegment';

interface IProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: IProps) => {
  return (
    <main className={style.dashboard_layout} >
      <PathSegment />
      {children}
    </main>
  )
}

export default DashboardLayout;