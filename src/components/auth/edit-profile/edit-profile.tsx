import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileUploader } from '@/components/ui/file-uploader'
import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'
import { ControlledTextField } from '@/controlled/controlled-text-field/controlled-text-field'
import { useMeQuery, useSetMeMutation } from '@/pages/auth/api/auth-api'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import c from './edit-profile.module.scss'

const editProfileSchema = z.object({
  name: z.string().min(2),
})

export const EditProfileForm = ({ editMode, onSubmit, setEditMode }: EditProfileFormProps) => {
  const { data: me } = useMeQuery()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(editProfileSchema),
  })

  return (
    <Card className={c.card}>
      <Typography variant={'h1'}>Personal Information</Typography>
      <Avatar isEditMode={editMode} />
      {!editMode ? (
        <div className={c.info}>
          <div className={c.name}>
            <Typography variant={'h2'}>{me?.name}</Typography>
            <Button className={c.icon} onClick={() => setEditMode(!editMode)} variant={'pure'}>
              <Icon height={'16px'} iconId={'edit'} width={'16px'} />
            </Button>
          </div>
          <Typography className={c.email} variant={'body2'}>
            {me?.email}
          </Typography>
          <Button variant={'secondary'}>
            <Icon height={'16px'} iconId={'out'} width={'16px'} />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </div>
      ) : (
        <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            defaultValue={''}
            errorMessage={errors.name?.message}
            label={'Nickname'}
            name={'name'}
            type={'default'}
          />
          <Button fullWidth type={'submit'} variant={'primary'}>
            <Typography variant={'subtitle2'}>Save Changes</Typography>
          </Button>
        </form>
      )}
    </Card>
  )
}

const Avatar = ({ isEditMode }: AvatarProps) => {
  const [setNewImage] = useSetMeMutation()
  const { data } = useMeQuery()

  const src = data?.avatar

  const setFile = (file: File) => {
    setNewImage({ avatar: file })
  }

  return (
    <div className={c.avatar}>
      <img className={c.image} src={src ?? ''} />
      {!isEditMode && <FileUploader className={c.edit} iconId={'edit'} setFile={setFile} />}
    </div>
  )
}

type AvatarProps = {
  avatar?: null | string
  isEditMode?: boolean
}

type FormValues = z.infer<typeof editProfileSchema>

type EditProfileFormProps = {
  editMode: boolean
  onSubmit: (name: EditProfileArgs) => void
  setEditMode: (editMode: boolean) => void
}

export type EditProfileArgs = {
  name: string
}
