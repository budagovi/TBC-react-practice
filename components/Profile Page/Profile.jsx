import style from './Profile.module.css';
import ChangePassForm from './ChangePassForm';
import { getDictionary } from '@/app/[lang]/dictionaries';

const sampleUser = {
    firstName: 'John',
    lastName: 'White',
    mobile: '+1234-56-78-90',
    address: 'City, Example Street',
    email: 'jwhite@example.com',
    password: 'password123'
}

const Profile = async ({user = sampleUser, lang}) => {

  const dict = await getDictionary(lang);


  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src='./images/profile.png' />
        <button>{}</button>
      </div>
      <div className={style.profileDescription}>
        <h2>{dict.p_info}</h2>
        <div className={style.profileInformation}>
          <section className={style.fields}>
            <span>{dict.p_name}:</span>
            <span>{dict.p_lastname}:</span>
            <span>{dict.p_mobile}:</span>
            <span>{dict.p_address}:</span>
            <span>{dict.p_email}:</span>
          </section>
          <section className={style.fields}>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <span>{user.mobile}</span>
            <span>{user.address}</span>
            <span>{user.email}</span>
          </section>
        </div>
        <h2>{dict.p_change_pass}</h2>
        <ChangePassForm password={user.password}/>
      </div>
    </div>
  )
}

export default Profile;