'use client'
// --- style
import style from './ProfileBanner.module.css';
// --- types
import type { IUser } from '@/src/lib/types/entities';
// --- next api
import { redirect } from 'next/navigation';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

interface IProps {
  user: IUser
}

/**
 * Banner of the all Profile route segments (image and fullname)
 */
const ProfileBanner = ({ user }: IProps) => {

  if (!user)
    redirect('/sign-in')

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const imgPlaceholder = blob?.url ? blob.url : "https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg"
  return (
    <div className={style.wrapper}>
      <div className={style.avatarWrapper}>
        <img src={imgPlaceholder} alt="avatar" />
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];

          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
          });

          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      <div className={style.text}>
        <span>{user.lastname}  {user.firstname}</span>
        <p>Your account is ready, {user.email}</p>
      </div>
    </div>
  )
}

export default ProfileBanner;