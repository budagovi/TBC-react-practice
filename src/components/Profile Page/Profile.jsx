import style from './Profile.module.css';
import avatarImg from '../../assets/profile.png';
import ChangePassForm from './ChangePassForm';

const Profile = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={avatarImg} />
        <button>upload picture</button>
      </div>
      <div className={style.profileDescription}>
        <h2>Profile Information</h2>
        <div className={style.profileInformation}>
          <section className={style.fields}>
            <span>First Name:</span>
            <span>Last Name:</span>
            <span>Mobile Number:</span>
            <span>Address:</span>
            <span>Email:</span>
          </section>
          <section className={style.fields}>
            <span>John</span>
            <span>White</span>
            <span>+1234-56-78-90</span>
            <span>City, Example Street</span>
            <span>jwhite@example.com</span>
          </section>
        </div>
        <h2>Change Password</h2>
        <ChangePassForm />
      </div>
    </div>
  )
}

export default Profile;