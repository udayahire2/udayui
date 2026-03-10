"use client";
import dynamic from "next/dynamic";

import * as React from "react";

/* ─────────────────────────────────────────────────────────
   Thin demo wrappers for every UI primitive component.
   Each is wrapped in a centred, padded stage so it looks
   good inside the ResizablePreview frame.
──────────────────────────────────────────────────────────── */

/* helpers */
const Stage = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background p-10 ${className}`}>
        {children}
    </div>
);

/* ── Accordion ── */
const AccordionDemo = dynamic(async () => {
    const { Accordion, AccordionContent, AccordionItem, AccordionTrigger } =
        await import("@/components/ui/accordion");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-md">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="a">
                            <AccordionTrigger>What is UDX UI?</AccordionTrigger>
                            <AccordionContent>A production-ready component library built with Next.js and Tailwind CSS.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="b">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>Yes. It follows WAI-ARIA guidelines throughout.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="c">
                            <AccordionTrigger>Can I customise it?</AccordionTrigger>
                            <AccordionContent>Absolutely — every component accepts className and composes with Tailwind.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Alert ── */
const AlertDemo = dynamic(async () => {
    const { Alert, AlertTitle, AlertDescription } = await import("@/components/ui/alert");
    const { Bell, Info, CheckCircle2, AlertTriangle, XCircle } = await import("lucide-react");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-md space-y-4">
                    <Alert>
                        <Bell aria-hidden="true" />
                        <AlertTitle>Heads up</AlertTitle>
                        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
                    </Alert>
                    <Alert variant="info">
                        <Info aria-hidden="true" />
                        <AlertTitle>New update available</AlertTitle>
                        <AlertDescription>Version 2.1 ships with refreshed sections and improved runtime performance.</AlertDescription>
                    </Alert>
                    <Alert variant="success">
                        <CheckCircle2 aria-hidden="true" />
                        <AlertTitle>Changes saved</AlertTitle>
                        <AlertDescription>Your profile updates were applied successfully.</AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                        <AlertTriangle aria-hidden="true" />
                        <AlertTitle>Storage nearly full</AlertTitle>
                        <AlertDescription>You are using 92% of your storage quota. Consider cleaning up old assets.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <XCircle aria-hidden="true" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
                    </Alert>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Alert Dialog ── */
const AlertDialogDemo = dynamic(async () => {
    const {
        AlertDialog, AlertDialogTrigger, AlertDialogContent,
        AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
        AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
    } = await import("@/components/ui/alert-dialog");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Animated Shader Background ── */
const AnimatedShaderBackgroundDemo = dynamic(
    () => import("@/components/ui/animated-shader-background")
);

/* ── Aspect Ratio ── */
const AspectRatioDemo = dynamic(async () => {
    const { AspectRatio } = await import("@/components/ui/aspect-ratio");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border">
                    <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">16 / 9</span>
                    </AspectRatio>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Avatar ── */
const AvatarDemo = dynamic(async () => {
    const { Avatar, AvatarFallback, AvatarImage } = await import("@/components/ui/avatar");
    function Demo() {
        return (
            <Stage>
                <div className="flex gap-4 items-center">
                    <Avatar className="size-14">
                        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-14">
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Badge ── */
const BadgeDemo = dynamic(async () => {
    const { Badge } = await import("@/components/ui/badge");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Breadcrumb ── */
const BreadcrumbDemo = dynamic(async () => {
    const {
        Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
        BreadcrumbSeparator, BreadcrumbPage,
    } = await import("@/components/ui/breadcrumb");
    function Demo() {
        return (
            <Stage>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Button ── */
const ButtonDemo = dynamic(async () => {
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Button Group ── */
const ButtonGroupDemo = dynamic(async () => {
    const { ButtonGroup } = await import("@/components/ui/button-group");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <ButtonGroup>
                    <Button variant="outline">Left</Button>
                    <Button variant="outline">Center</Button>
                    <Button variant="outline">Right</Button>
                </ButtonGroup>
                <ButtonGroup orientation="vertical" className="mt-4">
                    <Button variant="outline">Top</Button>
                    <Button variant="outline">Middle</Button>
                    <Button variant="outline">Bottom</Button>
                </ButtonGroup>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Calendar ── */
const CalendarDemo = dynamic(async () => {
    const { Calendar } = await import("@/components/ui/calendar");
    function Demo() {
        const [date, setDate] = React.useState<Date | undefined>(new Date());
        return (
            <Stage>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-border" />
            </Stage>
        );
    }
    return { default: Demo };
}, { ssr: false });

/* ── Card ── */
const CardDemo = dynamic(async () => {
    const { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } =
        await import("@/components/ui/card");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description goes here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">This is the card content area. Put anything here.</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button className="flex-1">Confirm</Button>
                        <Button variant="outline" className="flex-1">Cancel</Button>
                    </CardFooter>
                </Card>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Carousel ── */
const CarouselDemo = dynamic(async () => {
    const { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } =
        await import("@/components/ui/carousel");
    function Demo() {
        return (
            <Stage>
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <CarouselItem key={n}>
                                <div className="flex h-32 items-center justify-center rounded-lg bg-muted border border-border">
                                    <span className="text-3xl font-bold text-muted-foreground">{n}</span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Checkbox ── */
const CheckboxDemo = dynamic(async () => {
    const { Checkbox } = await import("@/components/ui/checkbox");
    const { Label } = await import("@/components/ui/label");
    function Demo() {
        return (
            <Stage>
                <div className="space-y-3">
                    {["Accept terms", "Subscribe to newsletter", "Enable notifications"].map((label, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Checkbox id={`cb-${i}`} defaultChecked={i === 0} />
                            <Label htmlFor={`cb-${i}`}>{label}</Label>
                        </div>
                    ))}
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Collapsible ── */
const CollapsibleDemo = dynamic(async () => {
    const { Collapsible, CollapsibleTrigger, CollapsibleContent } =
        await import("@/components/ui/collapsible");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        const [open, setOpen] = React.useState(false);
        return (
            <Stage>
                <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Expandable section</h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">{open ? "Collapse" : "Expand"}</Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="text-sm text-muted-foreground pt-2 border-t border-border">
                        This content is hidden until the section is expanded. Click the button above to toggle.
                    </CollapsibleContent>
                </Collapsible>
            </Stage>
        );
    }
    return { default: Demo };
}, { ssr: false });

/* ── Combobox ── */
const ComboboxDemo = dynamic(async () => {
    const {
        Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty,
    } = await import("@/components/ui/combobox");
    const frameworks = [
        { value: "next", label: "Next.js" },
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
    ];
    function Demo() {
        return (
            <Stage>
                <Combobox>
                    <ComboboxInput placeholder="Select framework…" className="w-52" />
                    <ComboboxContent>
                        <ComboboxList>
                            {frameworks.map((f) => (
                                <ComboboxItem key={f.value} value={f.value}>{f.label}</ComboboxItem>
                            ))}
                            <ComboboxEmpty>No results.</ComboboxEmpty>
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Dialog ── */
const DialogDemo = dynamic(async () => {
    const {
        Dialog, DialogTrigger, DialogContent, DialogHeader,
        DialogTitle, DialogDescription, DialogFooter,
    } = await import("@/components/ui/dialog");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Drawer ── */
const DrawerDemo = dynamic(async () => {
    const {
        Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
        DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
    } = await import("@/components/ui/drawer");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Drawer Panel</DrawerTitle>
                            <DrawerDescription>This slides up from the bottom of the screen.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Dropdown Menu ── */
const DropdownMenuDemo = dynamic(async () => {
    const {
        DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
        DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
    } = await import("@/components/ui/dropdown-menu");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Input ── */
const InputDemo = dynamic(async () => {
    const { Input } = await import("@/components/ui/input");
    const { Label } = await import("@/components/ui/label");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email-demo">Email address</Label>
                        <Input id="email-demo" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="pwd-demo">Password</Label>
                        <Input id="pwd-demo" type="password" placeholder="••••••••" />
                    </div>
                    <Input disabled placeholder="Disabled input" />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Input OTP ── */
const InputOTPDemo = dynamic(async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } =
        await import("@/components/ui/input-otp");
    function Demo() {
        return (
            <Stage>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Label ── */
const LabelDemo = dynamic(async () => {
    const { Label } = await import("@/components/ui/label");
    const { Input } = await import("@/components/ui/input");
    function Demo() {
        return (
            <Stage>
                <div className="space-y-1.5">
                    <Label htmlFor="lbl-demo">Full Name</Label>
                    <Input id="lbl-demo" placeholder="John Doe" className="max-w-xs" />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Liquid Glassy Button ── */
const LiquidGlassyButtonDemo = dynamic(async () => {
    const { LiquidGlassyButton } = await import("@/components/ui/liquid-glassy-button");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-col gap-4 items-center">
                    <LiquidGlassyButton className="px-8 py-3 text-base font-semibold">
                        Get Started
                    </LiquidGlassyButton>
                    <LiquidGlassyButton className="px-8 py-3 text-base font-semibold" disabled>
                        Disabled
                    </LiquidGlassyButton>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Mode Toggle ── */
const ModeToggleDemo = dynamic(async () => {
    const { ModeToggle } = await import("@/components/ui/mode-toggle");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-muted-foreground">Click to toggle light / dark mode</p>
                    <ModeToggle />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Pagination ── */
const PaginationDemo = dynamic(async () => {
    const {
        Pagination, PaginationContent, PaginationItem, PaginationLink,
        PaginationPrevious, PaginationNext, PaginationEllipsis,
    } = await import("@/components/ui/pagination");
    function Demo() {
        return (
            <Stage>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Popover ── */
const PopoverDemo = dynamic(async () => {
    const { Popover, PopoverTrigger, PopoverContent } = await import("@/components/ui/popover");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <p className="text-sm text-muted-foreground">This is a popover. It can contain any content.</p>
                    </PopoverContent>
                </Popover>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Progress ── */
const ProgressDemo = dynamic(async () => {
    const { Progress } = await import("@/components/ui/progress");
    function Demo() {
        const [value, setValue] = React.useState(0);
        React.useEffect(() => {
            const t = setTimeout(() => setValue(72), 500);
            return () => clearTimeout(t);
        }, []);
        return (
            <Stage>
                <div className="w-full max-w-sm space-y-4">
                    <Progress value={value} className="transition-all duration-700" />
                    <p className="text-center text-xs text-muted-foreground tabular-nums">{value}%</p>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
}, { ssr: false });

/* ── Radio Group ── */
const RadioGroupDemo = dynamic(async () => {
    const { RadioGroup, RadioGroupItem } = await import("@/components/ui/radio-group");
    const { Label } = await import("@/components/ui/label");
    function Demo() {
        return (
            <Stage>
                <RadioGroup defaultValue="option-1" className="space-y-2">
                    {["option-1", "option-2", "option-3"].map((opt, i) => (
                        <div key={opt} className="flex items-center gap-2">
                            <RadioGroupItem value={opt} id={opt} />
                            <Label htmlFor={opt}>Option {i + 1}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Select ── */
const SelectDemo = dynamic(async () => {
    const {
        Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel,
    } = await import("@/components/ui/select");
    function Demo() {
        return (
            <Stage>
                <Select>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="mango">Mango</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Separator ── */
const SeparatorDemo = dynamic(async () => {
    const { Separator } = await import("@/components/ui/separator");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <p className="text-sm font-medium">Profile Settings</p>
                        <Separator className="my-3" />
                        <p className="text-sm text-muted-foreground">Manage your account details.</p>
                    </div>
                    <div className="flex h-5 items-center gap-4">
                        <span className="text-sm text-muted-foreground">Blog</span>
                        <Separator orientation="vertical" />
                        <span className="text-sm text-muted-foreground">Docs</span>
                        <Separator orientation="vertical" />
                        <span className="text-sm text-muted-foreground">Source</span>
                    </div>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Sheet ── */
const SheetDemo = dynamic(async () => {
    const {
        Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
    } = await import("@/components/ui/sheet");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit Profile</SheetTitle>
                            <SheetDescription>Make changes to your profile here and click save.</SheetDescription>
                        </SheetHeader>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Skeleton ── */
const SkeletonDemo = dynamic(async () => {
    const { Skeleton } = await import("@/components/ui/skeleton");
    function Demo() {
        return (
            <Stage>
                <div className="flex items-center gap-4 w-full max-w-sm">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 rounded" />
                        <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                </div>
                <div className="w-full max-w-sm space-y-2">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Slider ── */
const SliderDemo = dynamic(async () => {
    const { Slider } = await import("@/components/ui/slider");
    function Demo() {
        const [value, setValue] = React.useState([60]);
        return (
            <Stage>
                <div className="w-full max-w-sm space-y-4">
                    <Slider value={value} onValueChange={setValue} max={100} step={1} />
                    <p className="text-center text-xs text-muted-foreground tabular-nums">Value: {value[0]}</p>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
}, { ssr: false });

/* ── Smooth Button (has default export) ── */
const SmoothButtonDemo = dynamic(() => import("@/components/ui/smooth-button"));

/* ── Switch ── */
const SwitchDemo = dynamic(async () => {
    const { Switch } = await import("@/components/ui/switch");
    const { Label } = await import("@/components/ui/label");
    function Demo() {
        const [checked, setChecked] = React.useState(false);
        return (
            <Stage>
                <div className="flex items-center gap-3">
                    <Switch id="sw-demo" checked={checked} onCheckedChange={setChecked} />
                    <Label htmlFor="sw-demo">{checked ? "Enabled" : "Disabled"}</Label>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Table ── */
const TableDemo = dynamic(async () => {
    const {
        Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
    } = await import("@/components/ui/table");
    const rows = [
        { name: "Alice", role: "Admin", status: "Active" },
        { name: "Bob", role: "Editor", status: "Inactive" },
        { name: "Carol", role: "Viewer", status: "Active" },
    ];
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-lg rounded-md border border-border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((r) => (
                                <TableRow key={r.name}>
                                    <TableCell className="font-medium">{r.name}</TableCell>
                                    <TableCell>{r.role}</TableCell>
                                    <TableCell>
                                        <span className={`text-xs font-medium ${r.status === "Active" ? "text-emerald-500" : "text-muted-foreground"}`}>{r.status}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Tabs ── */
const TabsDemo = dynamic(async () => {
    const { Tabs, TabsList, TabsTrigger, TabsContent } = await import("@/components/ui/tabs");
    function Demo() {
        return (
            <Stage>
                <Tabs defaultValue="overview" className="w-full max-w-sm">
                    <TabsList className="w-full">
                        <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
                        <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Overview content goes here.</p>
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Analytics content goes here.</p>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Settings content goes here.</p>
                    </TabsContent>
                </Tabs>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Textarea ── */
const TextareaDemo = dynamic(async () => {
    const { Textarea } = await import("@/components/ui/textarea");
    const { Label } = await import("@/components/ui/label");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-sm space-y-1.5">
                    <Label htmlFor="ta-demo">Your message</Label>
                    <Textarea id="ta-demo" placeholder="Type your message here…" rows={5} />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Toggle ── */
const ToggleDemo = dynamic(async () => {
    const { Toggle } = await import("@/components/ui/toggle");
    function Demo() {
        return (
            <Stage>
                <div className="flex gap-3 flex-wrap justify-center">
                    <Toggle aria-label="Bold">B</Toggle>
                    <Toggle aria-label="Italic" variant="outline"><em>I</em></Toggle>
                    <Toggle aria-label="Underline" defaultPressed><u>U</u></Toggle>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Toggle Group ── */
const ToggleGroupDemo = dynamic(async () => {
    const { ToggleGroup, ToggleGroupItem } = await import("@/components/ui/toggle-group");
    function Demo() {
        return (
            <Stage>
                <ToggleGroup type="single" defaultValue="center">
                    <ToggleGroupItem value="left" aria-label="Left">←</ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Center">≡</ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Right">→</ToggleGroupItem>
                </ToggleGroup>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Theme Toggle ── */
const ThemeToggleDemo = dynamic(async () => {
    const { ThemeToggle } = await import("@/components/ui/theme-toggle");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-col items-center gap-6">
                    <p className="text-sm text-muted-foreground">Click to switch between light & dark mode</p>
                    <ThemeToggle className="w-12 h-12" />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
}, { ssr: false });

/* ── Toggle System (all-in-one) ── */
const ToggleSystemDemo = dynamic(async () => {
    const { Toggle } = await import("@/components/ui/toggle");
    const { Switch } = await import("@/components/ui/switch");
    const { ThemeToggle } = await import("@/components/ui/theme-toggle");
    const { SegmentedControl } = await import("@/components/ui/segmented-control");
    const { MultiStateToggle } = await import("@/components/ui/multi-state-toggle");
    const { ColorPickerToggle } = await import("@/components/ui/color-picker-toggle");
    const { Bold, Italic, HandMetal, AlignLeft, AlignCenter, AlignRight } = await import("lucide-react");
    const { Label } = await import("@/components/ui/label");
    function Demo() {
        return (
            <div className="w-full bg-background p-8 md:p-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight mb-1">Toggle System</h1>
                        <p className="text-sm text-muted-foreground">Premium toggle components inspired by modern product design.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* 1. Responsive Switch */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Switch</h2>
                            <div className="flex flex-col gap-5 p-5 rounded-xl border bg-card shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="ts-airplane">Airplane Mode</Label>
                                        <div className="text-[0.78rem] text-muted-foreground">Disable all wireless communication.</div>
                                    </div>
                                    <Switch id="ts-airplane" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="ts-small">Small Variant</Label>
                                    <Switch id="ts-small" size="sm" />
                                </div>
                            </div>
                        </section>

                        {/* 2. Theme Toggle */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Theme Toggle</h2>
                            <div className="flex items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[120px]">
                                <ThemeToggle />
                            </div>
                        </section>

                        {/* 3. Segmented Control */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Segmented Control</h2>
                            <div className="flex flex-col gap-5 p-5 rounded-xl border bg-card shadow-sm">
                                <SegmentedControl
                                    defaultValue="preview"
                                    options={[
                                        { label: "Preview", value: "preview" },
                                        { label: "Code", value: "code" },
                                        { label: "Inspect", value: "inspect" },
                                    ]}
                                />
                                <SegmentedControl
                                    defaultValue="monthly"
                                    size="sm"
                                    options={[
                                        { label: "Monthly", value: "monthly" },
                                        { label: "Yearly (Save 20%)", value: "yearly" },
                                    ]}
                                />
                            </div>
                        </section>

                        {/* 4. Color Picker */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Color Picker</h2>
                            <div className="flex items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[120px]">
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

                        {/* 5. Multi-State Toggle */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Multi-State Toggle</h2>
                            <div className="flex gap-4 items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[120px]">
                                <div className="flex flex-col items-center gap-2">
                                    <Label className="text-xs text-muted-foreground">Text Alignment</Label>
                                    <MultiStateToggle
                                        defaultValue="left"
                                        states={[
                                            { value: "left", label: "Left", icon: <AlignLeft className="size-4" /> },
                                            { value: "center", label: "Center", icon: <AlignCenter className="size-4" /> },
                                            { value: "right", label: "Right", icon: <AlignRight className="size-4" /> },
                                        ]}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 6. Icon Toggle */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Icon Toggle</h2>
                            <div className="flex gap-2 items-center justify-center p-8 rounded-xl border bg-card shadow-sm h-[120px]">
                                <Toggle aria-label="Toggle bold"><Bold /></Toggle>
                                <Toggle aria-label="Toggle italic" variant="outline"><Italic /></Toggle>
                                <Toggle aria-label="Toggle metal"><HandMetal /></Toggle>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        );
    }
    return { default: Demo };
},
    { ssr: false }
);

/* ── Tooltip ── */
const TooltipDemo = dynamic(async () => {
    const { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } =
        await import("@/components/ui/tooltip");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>This is a tooltip</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── UDX Logo ── */
const UdxLogoDemo = dynamic(async () => {
    const { UDXLogo } = await import("@/components/ui/udx-logo");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-col items-center gap-6">
                    <UDXLogo className="w-24 h-24" />
                    <UDXLogo className="w-16 h-16 text-primary" />
                    <UDXLogo className="w-10 h-10 text-muted-foreground" />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Spinner ── */
const SpinnerDemo = dynamic(async () => {
    const { Spinner } = await import("@/components/ui/spinner");
    function Demo() {
        return (
            <Stage>
                <div className="flex gap-6 items-center">
                    <Spinner className="size-4" />
                    <Spinner className="size-6" />
                    <Spinner className="size-8" />
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Hover Card ── */
const HoverCardDemo = dynamic(async () => {
    const { HoverCard, HoverCardTrigger, HoverCardContent } = await import("@/components/ui/hover-card");
    const { Button } = await import("@/components/ui/button");
    const { Avatar, AvatarFallback, AvatarImage } = await import("@/components/ui/avatar");
    function Demo() {
        return (
            <Stage>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link">@nextjs</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                        <div className="flex gap-3 items-start">
                            <Avatar>
                                <AvatarImage src="https://github.com/vercel.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold">Next.js</p>
                                <p className="text-xs text-muted-foreground mt-1">The React framework for the web. Built by @vercel.</p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── KBD ── */
const KbdDemo = dynamic(async () => {
    const { Kbd } = await import("@/components/ui/kbd");
    function Demo() {
        return (
            <Stage>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>Save</span>
                    <div className="flex gap-1">
                        <Kbd>⌘</Kbd><Kbd>S</Kbd>
                    </div>
                    <span className="text-border">|</span>
                    <span>Search</span>
                    <div className="flex gap-1">
                        <Kbd>⌘</Kbd><Kbd>K</Kbd>
                    </div>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Scroll Area ── */
const ScrollAreaDemo = dynamic(async () => {
    const { ScrollArea } = await import("@/components/ui/scroll-area");
    const { Separator } = await import("@/components/ui/separator");
    const tags = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
    function Demo() {
        return (
            <Stage>
                <ScrollArea className="h-64 w-48 rounded-md border border-border">
                    <div className="p-4">
                        <p className="text-sm font-medium mb-3">Scrollable List</p>
                        {tags.map((tag, i) => (
                            <React.Fragment key={tag}>
                                <div className="text-sm py-1.5 text-muted-foreground">{tag}</div>
                                {i < tags.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Native Select ── */
const NativeSelectDemo = dynamic(async () => {
    const { NativeSelect } = await import("@/components/ui/native-select");
    function Demo() {
        return (
            <Stage>
                <NativeSelect className="w-48">
                    <option value="">Pick a colour…</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </NativeSelect>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Navigation Menu ── */
const NavigationMenuDemo = dynamic(async () => {
    const {
        NavigationMenu, NavigationMenuList, NavigationMenuItem,
        NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
        navigationMenuTriggerStyle,
    } = await import("@/components/ui/navigation-menu");
    function Demo() {
        return (
            <Stage>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4 w-48 space-y-1">
                                    {["Analytics", "Dashboard", "Reports"].map((item) => (
                                        <NavigationMenuLink key={item} className="block text-sm py-1 px-2 rounded hover:bg-muted cursor-pointer">{item}</NavigationMenuLink>
                                    ))}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">Docs</NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Input Group ── */
const InputGroupDemo = dynamic(async () => {
    const { InputGroup, InputGroupAddon, InputGroupInput } = await import("@/components/ui/input-group");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-sm space-y-3">
                    <InputGroup>
                        <InputGroupAddon align="inline-start">@</InputGroupAddon>
                        <InputGroupInput placeholder="username" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon align="inline-start">$</InputGroupAddon>
                        <InputGroupInput type="number" placeholder="0.00" />
                        <InputGroupAddon align="inline-end">.00</InputGroupAddon>
                    </InputGroup>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Empty ── */
const EmptyDemo = dynamic(async () => {
    const { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } = await import("@/components/ui/empty");
    const { Button } = await import("@/components/ui/button");
    function Demo() {
        return (
            <Stage>
                <Empty className="max-w-sm border border-dashed border-border">
                    <EmptyContent>
                        <EmptyHeader>
                            <EmptyTitle>No results found</EmptyTitle>
                            <EmptyDescription>Try adjusting your search or filter to find what you're looking for.</EmptyDescription>
                        </EmptyHeader>
                        <Button variant="outline" size="sm">Clear filters</Button>
                    </EmptyContent>
                </Empty>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Full Width Divider ── */
const FullWidthDividerDemo = dynamic(async () => {
    const { FullWidthDivider } = await import("@/components/ui/full-width-divider");
    function Demo() {
        return (
            <Stage>
                <div className="w-full max-w-md space-y-6">
                    <div className="relative py-6">
                        <p className="text-sm text-center text-muted-foreground mb-4">Section above this divider</p>
                        <FullWidthDivider contained position="bottom" />
                    </div>
                    <div className="relative py-6">
                        <p className="text-sm text-center text-muted-foreground">Section below this divider</p>
                        <FullWidthDivider contained position="top" />
                    </div>
                </div>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ── Resizable ── */
const ResizableDemo = dynamic(async () => {
    const { ResizablePanelGroup, ResizablePanel, ResizableHandle } =
        await import("@/components/ui/resizable");
    function Demo() {
        return (
            <Stage>
                <ResizablePanelGroup direction="horizontal" className="w-full max-w-lg rounded-lg border border-border overflow-hidden" style={{ height: 200 }}>
                    <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-4">
                            <span className="text-sm text-muted-foreground">Left panel</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-4">
                            <span className="text-sm text-muted-foreground">Right panel</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </Stage>
        );
    }
    return { default: Demo };
});

/* ─────────────────────
   EXPORT REGISTRY MAP
───────────────────────*/
export type UIDemoItem = {
    name: string;
    file: string;
    description: string;
    component: React.ComponentType<any>;
};

export const uiDemoRegistry: Record<string, UIDemoItem> = {
    accordion: { name: "Accordion", file: "accordion", description: "Vertically collapsible content panels.", component: AccordionDemo },
    alert: { name: "Alert", file: "alert", description: "Informational feedback banners.", component: AlertDemo },
    "alert-dialog": { name: "Alert Dialog", file: "alert-dialog", description: "Accessible modal confirmation dialogs.", component: AlertDialogDemo },
    "animated-shader-background": { name: "Animated Shader Background", file: "animated-shader-background", description: "GPU-accelerated WebGL shader backgrounds.", component: AnimatedShaderBackgroundDemo },
    "aspect-ratio": { name: "Aspect Ratio", file: "aspect-ratio", description: "Constraint boxes to a fixed aspect ratio.", component: AspectRatioDemo },
    avatar: { name: "Avatar", file: "avatar", description: "User profile image with fallback.", component: AvatarDemo },
    badge: { name: "Badge", file: "badge", description: "Compact status and label indicators.", component: BadgeDemo },
    breadcrumb: { name: "Breadcrumb", file: "breadcrumb", description: "Navigation trail for hierarchical pages.", component: BreadcrumbDemo },
    button: { name: "Button", file: "button", description: "Versatile action button with variants.", component: ButtonDemo },
    "button-group": { name: "Button Group", file: "button-group", description: "Grouped set of related action buttons.", component: ButtonGroupDemo },
    calendar: { name: "Calendar", file: "calendar", description: "Date picker with navigation.", component: CalendarDemo },
    card: { name: "Card", file: "card", description: "Content container with slots.", component: CardDemo },
    carousel: { name: "Carousel", file: "carousel", description: "Swipeable slide carousel.", component: CarouselDemo },
    checkbox: { name: "Checkbox", file: "checkbox", description: "Accessible boolean toggle.", component: CheckboxDemo },
    collapsible: { name: "Collapsible", file: "collapsible", description: "Animated expand/collapse wrapper.", component: CollapsibleDemo },
    combobox: { name: "Combobox", file: "combobox", description: "Searchable dropdown with autocomplete.", component: ComboboxDemo },
    dialog: { name: "Dialog", file: "dialog", description: "Accessible modal dialog.", component: DialogDemo },
    drawer: { name: "Drawer", file: "drawer", description: "Slide-in panel from screen edge.", component: DrawerDemo },
    "dropdown-menu": { name: "Dropdown Menu", file: "dropdown-menu", description: "Floating dropdown with sub-menus.", component: DropdownMenuDemo },
    empty: { name: "Empty", file: "empty", description: "Empty-state illustration.", component: EmptyDemo },
    "full-width-divider": { name: "Full Width Divider", file: "full-width-divider", description: "Edge-to-edge section separator.", component: FullWidthDividerDemo },
    "hover-card": { name: "Hover Card", file: "hover-card", description: "Rich tooltip card on hover.", component: HoverCardDemo },
    input: { name: "Input", file: "input", description: "Single-line text input.", component: InputDemo },
    "input-group": { name: "Input Group", file: "input-group", description: "Input with prefix/suffix slots.", component: InputGroupDemo },
    "input-otp": { name: "Input OTP", file: "input-otp", description: "Segmented OTP / PIN code input.", component: InputOTPDemo },
    kbd: { name: "KBD", file: "kbd", description: "Keyboard shortcut key badge.", component: KbdDemo },
    label: { name: "Label", file: "label", description: "Accessible form field label.", component: LabelDemo },
    "liquid-glassy-button": { name: "Liquid Glassy Button", file: "liquid-glassy-button", description: "Glassmorphism liquid-effect button.", component: LiquidGlassyButtonDemo },
    "mode-toggle": { name: "Mode Toggle", file: "mode-toggle", description: "Light/dark theme toggle.", component: ModeToggleDemo },
    "native-select": { name: "Native Select", file: "native-select", description: "Styled native HTML select.", component: NativeSelectDemo },
    "navigation-menu": { name: "Navigation Menu", file: "navigation-menu", description: "Accessible top-level navigation.", component: NavigationMenuDemo },
    pagination: { name: "Pagination", file: "pagination", description: "Page navigation controls.", component: PaginationDemo },
    popover: { name: "Popover", file: "popover", description: "Floating triggered content.", component: PopoverDemo },
    progress: { name: "Progress", file: "progress", description: "Linear progress bar.", component: ProgressDemo },
    "radio-group": { name: "Radio Group", file: "radio-group", description: "Single-select radio buttons.", component: RadioGroupDemo },
    resizable: { name: "Resizable", file: "resizable", description: "Drag-handle resizable panels.", component: ResizableDemo },
    "scroll-area": { name: "Scroll Area", file: "scroll-area", description: "Custom-styled scrollable container.", component: ScrollAreaDemo },
    select: { name: "Select", file: "select", description: "Accessible styleable select.", component: SelectDemo },
    separator: { name: "Separator", file: "separator", description: "Horizontal or vertical divider.", component: SeparatorDemo },
    sheet: { name: "Sheet", file: "sheet", description: "Slide-over panel.", component: SheetDemo },
    skeleton: { name: "Skeleton", file: "skeleton", description: "Loading placeholder.", component: SkeletonDemo },
    slider: { name: "Slider", file: "slider", description: "Range input slider.", component: SliderDemo },
    "smooth-button": { name: "Smooth Button", file: "smooth-button", description: "Neumorphic liquid-feel controls.", component: SmoothButtonDemo },
    switch: { name: "Switch", file: "switch", description: "Toggle on/off switch.", component: SwitchDemo },
    table: { name: "Table", file: "table", description: "Semantic accessible data table.", component: TableDemo },
    tabs: { name: "Tabs", file: "tabs", description: "Tab group for content panels.", component: TabsDemo },
    textarea: { name: "Textarea", file: "textarea", description: "Multi-line text input.", component: TextareaDemo },
    toggle: { name: "Toggle", file: "toggle", description: "Pressed-state toggle button.", component: ToggleDemo },
    "toggle-system": { name: "Toggle System", file: "toggle", description: "All-in-one showcase of every premium toggle variant.", component: ToggleSystemDemo },
    "toggle-group": { name: "Toggle Group", file: "toggle-group", description: "Grouped toggle buttons.", component: ToggleGroupDemo },
    "theme-toggle": { name: "Theme Toggle", file: "theme-toggle", description: "Animated sun/moon light-dark theme switcher.", component: ThemeToggleDemo },
    tooltip: { name: "Tooltip", file: "tooltip", description: "Lightweight popup on hover.", component: TooltipDemo },
    spinner: { name: "Spinner", file: "spinner", description: "Animated loading spinner.", component: SpinnerDemo },
    "udx-logo": { name: "UDX Logo", file: "udx-logo", description: "Animated UDX UI brand logo.", component: UdxLogoDemo },
};
