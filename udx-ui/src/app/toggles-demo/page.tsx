import { Toggle } from "@/components/ui/toggle"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { MultiStateToggle } from "@/components/ui/multi-state-toggle"
import { ColorPickerToggle } from "@/components/ui/color-picker-toggle"
import { Bold, Italic, HandMetal, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function TogglesDemo() {
    return (
        <div className="p-12 max-w-4xl mx-auto space-y-16">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Toggle System</h1>
                <p className="text-muted-foreground">Premium toggle components inspired by modern product design.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Responsive Toggle Switch */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">1. Responsive Switch</h2>
                    <div className="flex flex-col gap-6 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                                <div className="text-[0.8rem] text-muted-foreground">Disable all wireless communication.</div>
                            </div>
                            <Switch id="airplane-mode" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="small-mode">Small Variant</Label>
                            </div>
                            <Switch id="small-mode" size="sm" />
                        </div>
                    </div>
                </section>

                {/* Light/Dark Toggle */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">2. Theme Toggle</h2>
                    <div className="flex items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[130px]">
                        <ThemeToggle />
                    </div>
                </section>

                {/* Segmented Control */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">3. Segmented Control</h2>
                    <div className="flex flex-col gap-6 p-6 rounded-xl border bg-card shadow-sm">
                        <SegmentedControl
                            defaultValue="preview"
                            options={[
                                { label: "Preview", value: "preview" },
                                { label: "Code", value: "code" },
                                { label: "Inspect", value: "inspect" }
                            ]}
                        />
                        <SegmentedControl
                            defaultValue="monthly"
                            size="sm"
                            options={[
                                { label: "Monthly", value: "monthly" },
                                { label: "Yearly (Save 20%)", value: "yearly" }
                            ]}
                        />
                    </div>
                </section>

                {/* Color Picker */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">4. Color Picker</h2>
                    <div className="flex items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[130px]">
                        <ColorPickerToggle
                            defaultValue="blue"
                            colors={[
                                { label: "Red", value: "red", colorCode: "#EF4444" },
                                { label: "Orange", value: "orange", colorCode: "#F97316" },
                                { label: "Yellow", value: "yellow", colorCode: "#EAB308" },
                                { label: "Green", value: "green", colorCode: "#22C55E" },
                                { label: "Blue", value: "blue", colorCode: "#3B82F6" },
                                { label: "Purple", value: "purple", colorCode: "#A855F7" },
                            ]}
                        />
                    </div>
                </section>

                {/* Multi-State Toggle */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">5. Multi-State Toggle</h2>
                    <div className="flex gap-4 items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[130px]">
                        <div className="flex flex-col items-center gap-2">
                            <Label className="text-xs text-muted-foreground">Text Alignment</Label>
                            <MultiStateToggle
                                defaultValue="left"
                                states={[
                                    { value: "left", label: "Left", icon: <AlignLeft className="size-4" /> },
                                    { value: "center", label: "Center", icon: <AlignCenter className="size-4" /> },
                                    { value: "right", label: "Right", icon: <AlignRight className="size-4" /> }
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Icon Toggle Button */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">6. Icon Toggle Button</h2>
                    <div className="flex gap-2 items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[130px]">
                        <Toggle aria-label="Toggle bold">
                            <Bold />
                        </Toggle>
                        <Toggle aria-label="Toggle italic" variant="outline">
                            <Italic />
                        </Toggle>
                        <Toggle aria-label="Toggle metal">
                            <HandMetal />
                        </Toggle>
                    </div>
                </section>

            </div>
        </div>
    )
}
