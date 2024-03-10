import { useState } from 'react'

import { DeckForm } from '@/components/forms/AddNewDeckForm'
import { Button } from '@/components/ui/button/button'
import { Icon } from '@/components/ui/icon/Icon'
import { SuperModal } from '@/components/ui/modal'
import { useUpdateDecksMutation } from '@/pages/decks/api/decks-api'
import { CreateDecksArgs } from '@/pages/decks/api/decks-types'

export const EditControl = (props: PropsType) => {
  const { className, deckId, deckName } = props

  const [open, setOpen] = useState<boolean>(false)

  const [deck] = useUpdateDecksMutation()

  const changeModalState = () => {
    setOpen(!open)
  }

  const editDeck = (newDeck: CreateDecksArgs) => {
    console.log(newDeck)
    deck({ id: deckId, ...newDeck })
      .unwrap()
      .catch(e => {
        console.log(e.data.message)
      })
  }

  return (
    <>
      <SuperModal
        changeModalState={changeModalState}
        open={open}
        title={'Edit Deck'}
        withTrigger={false}
      >
        <DeckForm
          changeModalState={changeModalState}
          createNewDeck={editDeck}
          deckName={deckName}
          text={'Edit Deck'}
          withSecondary
        />
      </SuperModal>
      <Button className={className} onClick={() => setOpen(!open)} variant={'pure'}>
        <Icon height={'16px'} iconId={'Edit'} width={'16px'} />
      </Button>
    </>
  )
}

type PropsType = {
  className: string
  deckId: string
  deckName: string
}
