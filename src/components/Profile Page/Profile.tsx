import style from './Profile.module.css';
import EditProfile from './EditProfile';
const Profile = ({ }: { dict: any }) => {

  return (
    <div className={style.wrapper}>
      {/*   -=-=-=- Profile Page Navigation -=-=-=-   */}
      <aside>
        <span>Manage my profile</span>
        <ul>
          <li>My Profile</li>
          <li>Address book</li>
          <li>My payment options</li>
        </ul>
        <span>My orders</span>
        <ul>
          <li>My returns</li>
          <li>My cancelations</li>
        </ul>
      </aside>
      <section>
        <EditProfile />
      </section>
    </div>
  )
}

export default Profile;