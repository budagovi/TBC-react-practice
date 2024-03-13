import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <div className={style.subscription}>
        <span>Subscribe to our newsletter</span>
        <div className={style.inputWrapper}>
          <input type='text' placeholder='Enter email' />
          <input type='submit' value="Subscribe" />
        </div>
      </div>
      <section className={style.links}>
        <a href='#'>Terms and Conditions</a>
        <a href='#'>Privacy Policy</a>
      </section>
    </footer>
  )
}

export default Footer;