// src/components/CustomTransition.jsx
import { Transition as HeadlessTransition } from '@headlessui/react'
import { Fragment } from 'react'

// Main Transition — strips as={Fragment} automatically
const Transition = ({ children, as, ...props }) => {
  return (
    <HeadlessTransition as={as === Fragment ? 'div' : (as || 'div')} {...props}>
      {children}
    </HeadlessTransition>
  )
}

// Transition.Child — strips as={Fragment} automatically
Transition.Child = ({ children, as, ...props }) => {
  return (
    <HeadlessTransition.Child as={as === Fragment ? 'div' : (as || 'div')} {...props}>
      {children}
    </HeadlessTransition.Child>
  )
}

// Transition.Root — same fix
Transition.Root = ({ children, as, ...props }) => {
  return (
    <HeadlessTransition as={as === Fragment ? 'div' : (as || 'div')} {...props}>
      {children}
    </HeadlessTransition>
  )
}

export default Transition