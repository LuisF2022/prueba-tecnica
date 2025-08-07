'use client'

import { useMessagesChat } from "@/store/messagesChatStore";
import { useUserChat } from "@/store/userChatStore";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import * as Yup from 'yup';
import { Button } from "../ui/button";
import { Plus, SendHorizontal, Undo2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

let socket: Socket

const ChatComponent = () => {

    const { userName, saveName } = useUserChat()
    const { messages, addMessages } = useMessagesChat()
    const startChat = useRef<HTMLDivElement | null>(null)
    const { t, i18n } = useTranslation(['chat'])

    if (!userName) {
        saveName(`User_${Date.now()}`)
    }

    useEffect(() => {
        if (!userName || !i18n.isInitialized) return

        socket = io('http://localhost:4000');

        socket.on('connect', () => {
            socket.emit('mensaje', {
                id: Date.now().toString(),
                user: '',
                text: t('userConnect', { ns: 'chat', name: userName })
            })
        })

        const handleMessage = (msg: { id: string, user: string, text: string }) => {
            addMessages([msg])
            requestAnimationFrame(() => startChat.current?.scrollIntoView({ behavior: 'smooth' }))
        }

        socket.on('mensaje', handleMessage)

        return () => {
            socket.emit('mensaje', {
                id: Date.now().toString(),
                user: '',
                text: t('userDisconnect', { ns: 'chat', name: userName })
            })
            socket.off('mensaje', handleMessage)
            socket.disconnect()
        }

    }, [userName, i18n])

    const enviarMensaje = (data: { message: string }) => {
        if (data.message.trim()) {
            socket.emit('mensaje', {
                id: Date.now(),
                user: userName,
                text: data.message
            })
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-start bg-muted p-2 rounded-md">
                    <span className="flex justify-center font-bold text-lg">
                        Chat
                    </span>
                </div>

                <div className="space-y-1 h-98 overflow-y-auto flex flex-col py-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`w-full sm:w-2/4 p-2 rounded-2xl break-words ${userName === message.user ? 'justify-end bg-muted ml-auto' : 'justify-start bg-muted mr-auto'}`}>
                            <span className="text-left">{message.user !== '' && (
                                <span className="text-sm font-semibold">
                                    {message.user}<br />
                                </span>
                            )}{message.text}</span></div>

                    ))}
                    <div ref={startChat}></div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                    <Formik
                        initialValues={
                            { message: '' }
                        }
                        validationSchema={Yup.object({
                            message: Yup.string().max(100, 'El mensaje debe tener maximo 100 caracteres')
                        })}
                        onSubmit={(data, { resetForm }) => {
                            enviarMensaje(data)
                            resetForm()
                        }}
                    >
                        <Form>
                            <div className="flex items-center justify-start">
                                <div className="flex flex-col m-3 w-3/4">
                                    <Field
                                        type='text'
                                        placeholder='Escriba su mensaje ...'
                                        name='message'
                                        autoComplete='off'
                                        className='bg-white p-1 border rounded-md w-auto'
                                    />
                                    <ErrorMessage name="message" className="text-black text-sm" component='div' />
                                </div>
                                <Button className="hover:cursor-pointer rounded-full" size='icon' type="submit">
                                    <SendHorizontal />
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
        </>

    )
}

export default ChatComponent