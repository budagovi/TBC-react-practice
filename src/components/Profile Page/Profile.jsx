import style from './Profile.module.css';
import ChangePassForm from './ChangePassForm';

const sampleUser = {
    firstName: 'John',
    lastName: 'White',
    mobile: '+1234-56-78-90',
    address: 'City, Example Street',
    email: 'jwhite@example.com',
    password: 'password123'
}

const Profile = ({user = sampleUser}) => {
  


  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src='./images/profile.png' />
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
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <span>{user.mobile}</span>
            <span>{user.address}</span>
            <span>{user.email}</span>
          </section>
        </div>
        <h2>Change Password</h2>
        <ChangePassForm password={user.password}/>
      </div>
    </div>
  )
}

export default Profile;