'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import style from './style.module.css';
import Button from '@/src/UI/Button/Button';
import Modal from '@/src/UI/Modal/Modal';
import { addUser } from './actions';
import User from '@/src/interfaces/user';

// --- next-internationalization api
//import { Locale } from "@/i18n.config";
// import { setStaticParamsLocale } from "next-international/server";
// import { getStaticParams } from '@/src/locales/server';

// export function generateStaticParams() {
//   return getStaticParams()
// }

// interface Props {
//   params: {
//     locale: Locale
//   }
// }

interface SingleUser {
  id: number | null;
  firstname: string;
  lastname: string;
  dob: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
  mobile: string;
  address: string;
  role: 'user' | 'admin';
}

function maskString(str: string) {
  return str.replace(/./g, '*');
}

// { params: { locale } }: Props
const AdminPage = () => {

  // static rendering for both languages on build
  // setStaticParamsLocale(locale)

  const today = new Date()
  const [users, setUsers] = useState<User[]>(() => [])
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [user, setUser] = useState<SingleUser>({
    id: null,
    firstname: '',
    lastname: '',
    dob: '',
    gender: 'male',
    email: '',
    password: '',
    mobile: '',
    address: '',
    role: 'user',
  })

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const toggleEdit = (id?: number) => {
    if (!showEdit) {
      const u = users.find(user => user.id == id)
      if (u)
        setUser({
          id: u.id,
          firstname: u.firstname,
          lastname: u.lastname,
          dob: u.dob.split('T')[0],
          gender: u.gender,
          email: u.email,
          password: u.password,
          mobile: u.mobile,
          address: u.address,
          role: u.role,
        })
    }
    setShowEdit(prev => !prev)
  }

  const fetchUsers = () => {
    const fetchData = async () => {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        setUsers(data)
      }
    }

    fetchData()
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const deleteUser = (id: number) => {
    const del = async () => {
      const response = await fetch('/api/users/' + id, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchUsers();
        console.log('user deleted successfully')
      }
    }

    del()
  }

  const editUser = () => {
    const edit = async () => {
      if (user.id) {
        const response = await fetch('/api/users/' + user.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })

        if (response.ok) {
          fetchUsers();
          console.log('user updated successfully')
        }
      }
    }

    edit()
  }

  console.log('env key is ' + process.env.VERCEL_URL)

  return (
    <div className={style.wrapper}>

      <Modal show={showModal}>
        <form className={style.form} action={addUser} onSubmit={toggleModal}>
          <h3> add new user </h3>
          <input
            type="text"
            placeholder='firstname'
            name='firstname'
          />
          <input
            type="text"
            placeholder='lastname'
            name='lastname'
          />
          <input
            type="date"
            placeholder='date of birth'
            name='dob'
          />
          <select name='gender'>
            <option value="m">male</option>
            <option value="f">female</option>
          </select>
          <input
            type="text"
            placeholder='address'
            name='address'
          />
          <input
            type="text"
            placeholder='mobile'
            name='mobile'
          />
          <input
            type="email"
            placeholder='email'
            name='email'
          />
          <input
            type="text"
            placeholder='password'
            name='password'
          />
          <select name='role'>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div className={style.formActions}>
            <Button type='submit'>add</Button>
            <Button onClick={toggleModal}>cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal show={showEdit}>
        <form className={style.form} onSubmit={() => { toggleEdit(); editUser() }}>
          <h3> edit user </h3>
          <input
            type="text"
            placeholder='firstname'
            name='firstname'
            value={user.firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, firstname: e.target.value }
              })
            }}
          />
          <input
            type="text"
            placeholder='lastname'
            name='lastname'
            value={user.lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, lastname: e.target.value }
              })
            }}
          />
          <input
            type="date"
            placeholder='date of birth'
            name='dob'
            value={user.dob}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, dob: e.target.value }
              })
            }}
          />
          <select
            name='gender'
            value={user.gender}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setUser(prev => {
                return { ...prev, gender: e.target.value as 'male' | 'female' }
              })
            }}
          >
            <option value="m">male</option>
            <option value="f">female</option>
          </select>
          <input
            type="text"
            placeholder='address'
            name='address'
            value={user.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, address: e.target.value }
              })
            }}
          />
          <input
            type="text"
            placeholder='mobile'
            name='mobile'
            value={user.mobile}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, mobile: e.target.value }
              })
            }}
          />
          <input
            type="email"
            placeholder='email'
            name='email'
            value={user.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, email: e.target.value }
              })
            }}
          />
          <input
            type="text"
            placeholder='password'
            name='password'
            value={user.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUser(prev => {
                return { ...prev, password: e.target.value }
              })
            }}
          />
          <select
            name='role'
            value={user.role}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setUser(prev => {
                return { ...prev, role: e.target.value as 'user' | 'admin' }
              })
            }}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div className={style.formActions}>
            <Button type='submit'>save</Button>
            <Button onClick={() => toggleEdit()}>cancel</Button>
          </div>
        </form>
      </Modal>

      <h2>Users List: </h2>
      <br />
      <Button onClick={toggleModal}>Add user</Button>
      <br />
      {users.map((user, idx) =>
        <div key={idx} className={style.card}>
          <div className={style.info}>
            <span>{user.firstname + ' ' + user.lastname}</span>
            <span><span>age: </span>{today.getFullYear() - +user.dob.split('-')[0]}</span>
            <span><span>gender: </span>{user.gender === 'male' ? 'male' : 'female'}</span>
            <span><span>address: </span>{user.address}</span>
            <span><span>mobile: </span>{user.mobile}</span>
            <span><span>email: </span>{user.email}</span>
            <span><span>password: </span>{maskString(user.password)}</span>
          </div>
          <div className={style.actions}>
            <Button onClick={() => toggleEdit(user.id)}>edit</Button>
            <Button onClick={() => deleteUser(user.id)}>X</Button>
          </div>
        </div>)}
    </div>
  )
}

export default AdminPage;