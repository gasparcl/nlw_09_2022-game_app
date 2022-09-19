import { useState, useEffect, FormEvent } from "react"
import axios from "axios"

import { Check, GameController } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import * as Checkbox from "@radix-ui/react-checkbox"

import { FormInput } from "../Form/Input"
import WeekDaysToggleGroup from "../WeekDaysToggleGroup"

// ╔╦╗╔═╗╔╦╗╔═╗╔╦╗╔═╗╔╦╗╔═╗
// ║║║║╣  ║ ╠═╣ ║║╠═╣ ║ ╠═╣
// ╩ ╩╚═╝ ╩ ╩ ╩═╩╝╩ ╩ ╩ ╩ ╩
interface Game {
    id: string
    title: string
}

export default function CreateAdModal() {
    // ╦ ╦╔═╗╔═╗╦╔═╔═╗
    // ╠═╣║ ║║ ║╠╩╗╚═╗
    // ╩ ╩╚═╝╚═╝╩ ╩╚═╝
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios("http://localhost:3333/games").then((response) => {
            setGames(response.data)
        })
    }, [])

    // ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    // ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    // ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝
    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if (!data.name) return

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })

            alert("Anúncio criado com sucesso!")
        } catch (error) {
            console.log(error)
            alert(`Erro ${error} ao criar o anúncio!`)
        }
    }

    // Importante para elevar a aplicação a um level mais profissional:
    // Implementar a lib Keen Sliders,
    // Implementar a lib React hook forms para validação do form da aplicação...

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">
                    Publique um anúncio
                </Dialog.Title>

                <form
                    onSubmit={handleCreateAd}
                    className="mt-8 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">
                            Qual o game?
                        </label>
                        <select
                            name="game"
                            id="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                            defaultValue=""
                        >
                            <option disabled value="">
                                Selecione o game que deseja jogar
                            </option>

                            {games.map((game) => {
                                return (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Seu nome (ou nickname)</label>
                        <FormInput
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Como te chamam dentro do game?"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearPlaying">
                                Joga há quantos anos?
                            </label>
                            <FormInput
                                type="number"
                                name="yearsPlaying"
                                id="yearsPlaying"
                                placeholder="Tudo bem ser ZERO"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <FormInput
                                type="text"
                                name="discord"
                                id="discord"
                                placeholder="Usuario#0000"
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">
                                Quando costuma jogar?
                            </label>
                            <WeekDaysToggleGroup
                                weekDays={weekDays}
                                setWeekDays={setWeekDays}
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">
                                Qual horário do dia?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <FormInput
                                    name="hourStart"
                                    id="hourStart"
                                    placeholder="De"
                                    type="time"
                                />
                                <FormInput
                                    name="hourEnd"
                                    id="hourEnd"
                                    placeholder="Até"
                                    type="time"
                                />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (!!checked) setUseVoiceChannel(true)
                                else setUseVoiceChannel(false)
                            }}
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex gap-4 justify-end">
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-all"
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="flex gap-3 items-center bg-violet-500 px-5 h-12 rounded-md hover:bg-violet-600 transition-all"
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
