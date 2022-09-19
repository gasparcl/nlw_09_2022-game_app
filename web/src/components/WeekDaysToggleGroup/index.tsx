import * as ToggleGroup from "@radix-ui/react-toggle-group"

// ╔╦╗╔═╗╔╦╗╔═╗╔╦╗╔═╗╔╦╗╔═╗
// ║║║║╣  ║ ╠═╣ ║║╠═╣ ║ ╠═╣
// ╩ ╩╚═╝ ╩ ╩ ╩═╩╝╩ ╩ ╩ ╩ ╩
const weekDaysList = [
    {
        id: "0",
        title: "Domingo",
        label: "D",
    },
    {
        id: "1",
        title: "Segunda",
        label: "S",
    },
    {
        id: "2",
        title: "Terça",
        label: "T",
    },
    {
        id: "3",
        title: "Quarta",
        label: "Q",
    },
    {
        id: "4",
        title: "Quinta",
        label: "Q",
    },
    {
        id: "5",
        title: "Sexta",
        label: "S",
    },
    {
        id: "6",
        title: "Sábado",
        label: "S",
    },
]

interface WeekDaysComponentProps {
    weekDays: string[]
    setWeekDays: any
}

export default function WeekDaysToggleGroup({
    weekDays,
    setWeekDays,
}: WeekDaysComponentProps) {
    return (
        <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-2"
            value={weekDays}
            onValueChange={setWeekDays}
        >
            {weekDaysList.map((day) => (
                <ToggleGroup.Item
                    key={day.id}
                    value={day.id}
                    className={`w-8 h-8 rounded ${
                        weekDays.includes(`${day.id}`)
                            ? "bg-violet-500"
                            : "bg-zinc-900"
                    }`}
                    title={day.title}
                >
                    {day.label}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup.Root>
    )
}
