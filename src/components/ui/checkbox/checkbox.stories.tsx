import type {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from './'
import {useState} from "react";

const meta = {
    component: Checkbox,
    tags: ['autodocs'],
    title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const OnlyCheckbox: Story = {
    args: {
        checked: false,
        disabled: false,
        name: 'OnlyCheckbox'
    },
    render: args => {
        const [checked, setChecked] = useState<boolean>(args.checked)
        const onChangeCheckboxChecked = () => {
            setChecked(!checked)
        }
        return <Checkbox {...args} onChange={onChangeCheckboxChecked} checked={checked}/>
    },
}

export const Checked: Story = {
    args: {
        checked: true,
        disabled: false,
        label: 'Click me',
        name: 'Checked'
    },
    render: args => {
        const [checked, setChecked] = useState<boolean>(args.checked)
        const onChangeCheckboxChecked = () => {
            setChecked(!checked)
        }
        return <Checkbox {...args} onChange={onChangeCheckboxChecked} checked={checked}/>
    },
}

export const UnChecked: Story = {
    args: {
        checked: false,
        disabled: false,
        label: 'Click me',
        name: 'UnChecked'
    },
    render: args => {
        const [checked, setChecked] = useState<boolean>(args.checked)
        const onChangeCheckboxChecked = () => {
            setChecked(!checked)
        }
        return <Checkbox {...args} onChange={onChangeCheckboxChecked} checked={checked}/>
    },
}

export const DisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true,
        label: 'Click me',
        name: 'DisabledChecked'
    },
}

export const DisabledUnChecked: Story = {
    args: {
        checked: false,
        disabled: true,
        label: 'Click me',
        name: 'DisabledUnChecked'
    },
}
