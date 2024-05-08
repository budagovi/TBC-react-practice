import style from './Profile.module.css';
import ChangePassForm from './ChangePassForm';
import img from '@/public/images/profile.png'
import Image from 'next/image';

const Profile = ({ dict }: { dict: any }) => {

  const user = {
    firstName: 'John',
    lastName: 'White',
    mobile: '+1234-56-78-90',
    address: 'City, Example Street',
    email: 'jwhite@example.com',
    password: 'password123'
  }

  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <Image src={img}  alt='profile picture'/>
        <button>{dict.pictureBtn}</button>
      </div>
      <div className={style.profileDescription}>
        <h2>{dict.title}</h2>
        <div className={style.profileInformation}>
          <section className={style.fields}>
            <span>{dict.name}:</span>
            <span>{dict.lastname}:</span>
            <span>{dict.mobile}:</span>
            <span>{dict.address}:</span>
            <span>{dict.email}:</span>
          </section>
          <section className={style.fields}>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <span>{user.mobile}</span>
            <span>{user.address}</span>
            <span>{user.email}</span>
          </section>
        </div>
        <h2>{dict.passForm.title}</h2>
        <ChangePassForm dict={dict.passForm}/>
      </div>
    </div>
  )
}

export default Profile;