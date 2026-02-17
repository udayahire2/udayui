"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Github, Linkedin, Twitter, ExternalLink, Award, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Types ---

export interface TeamMember {
    id: string | number;
    name: string;
    role: string;
    bio: string;
    fullBio?: string;
    avatar: string;
    skills?: string[];
    achievements?: string[];
    socials?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
}

interface TeamBlockProps {
    members?: TeamMember[];
    title?: string;
    description?: string;
    className?: string;
}

// --- Data ---
// Default data for preview/demonstration
const defaultMembers: TeamMember[] = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Lead Product Designer",
        bio: "Visionary designer crafting intuitive experiences.",
        fullBio:
            "Alex has over 10 years of experience in product design, having worked with top tech companies to deliver award-winning interfaces. He believes in a user-first approach and is passionate about accessibility and inclusive design.",
        avatar:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        skills: ["UI/UX", "Design Systems", "Prototyping"],
        achievements: ["Best Design Award 2024", "Speaker at DesignConf"],
        socials: { twitter: "#", linkedin: "#", website: "#" },
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Senior Frontend Engineer",
        bio: "Building performant and scalable web applications.",
        fullBio:
            "Sarah is a code wizard who specializes in React and modern CSS. She loves optimizing performance and ensuring smooth animations. She contributes to open source projects and mentors aspiring developers.",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
        skills: ["React", "TypeScript", "WebGL"],
        achievements: ["Open Source Contributor", "Tech Lead"],
        socials: { twitter: "#", linkedin: "#", github: "#" },
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Head of Engineering",
        bio: "Leading teams to deliver robust software solutions.",
        fullBio:
            "Michael brings a wealth of experience in software architecture and team leadership. He focuses on building scalable systems and fostering a culture of innovation and continuous learning within the engineering team.",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
        skills: ["System Architecture", "Cloud Infrastructure", "Leadership"],
        achievements: ["Scaled Team to 50+", "CTO at Startup"],
        socials: { linkedin: "#", github: "#" },
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Chief Marketing Officer",
        bio: "Driving growth through strategic storytelling.",
        fullBio:
            "Emily is a marketing strategist with a knack for storytelling. She understands market trends and user behavior, creating campaigns that resonate with audiences and drive brand growth.",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        skills: ["Brand Strategy", "Content Marketing", "Analytics"],
        achievements: ["Forbes 30 Under 30", "Viral Campaign Award"],
        socials: { twitter: "#", linkedin: "#" },
    },
];

// --- Subcomponents ---

const TeamMemberCard = React.memo(
    ({ member, onClick }: { member: TeamMember; onClick: () => void }) => {
        return (
            <DialogTrigger asChild>
                <div
                    onClick={onClick}
                    className="group cursor-pointer h-full"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onClick();
                        }
                    }}
                >
                    <Card className="h-full bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden border border-white/5">
                        <CardContent className="p-0 h-full">
                            <div className="relative aspect-4/5 overflow-hidden">
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                {/* Image */}
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                                    <p className="text-sm font-medium text-white/80 mb-1 tracking-wider uppercase">
                                        {member.role}
                                    </p>
                                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300 opacity-0 group-hover:opacity-100">
                                        <p className="text-sm text-white/70 line-clamp-2">{member.bio}</p>
                                        <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary hover:gap-2 transition-all">
                                            Read Bio <ExternalLink size={12} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogTrigger>
        );
    }
);
TeamMemberCard.displayName = "TeamMemberCard";

const TeamMemberDetails = ({ member }: { member: TeamMember }) => {
    return (
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
            <div className="grid md:grid-cols-[250px_1fr] h-full">
                <div className="relative h-64 md:h-full">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/80 to-transparent" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <DialogHeader className="mb-6 text-left">
                        <Badge variant="secondary" className="w-fit mb-2">
                            {member.role}
                        </Badge>
                        <DialogTitle className="text-3xl font-bold mb-1">
                            {member.name}
                        </DialogTitle>
                        <div className="flex gap-2 mt-2">
                            {member.socials?.twitter && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:text-primary"
                                    asChild
                                >
                                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                                        <Twitter size={16} />
                                        <span className="sr-only">Twitter</span>
                                    </a>
                                </Button>
                            )}
                            {member.socials?.linkedin && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:text-primary"
                                    asChild
                                >
                                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Linkedin size={16} />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                </Button>
                            )}
                            {member.socials?.github && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:text-primary"
                                    asChild
                                >
                                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                                        <Github size={16} />
                                        <span className="sr-only">GitHub</span>
                                    </a>
                                </Button>
                            )}
                            {member.socials?.website && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:text-primary"
                                    asChild
                                >
                                    <a href={member.socials.website} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink size={16} />
                                        <span className="sr-only">Website</span>
                                    </a>
                                </Button>
                            )}
                        </div>
                    </DialogHeader>
                    <DialogDescription className="text-base text-muted-foreground leading-relaxed mb-8">
                        {member.fullBio || member.bio}
                    </DialogDescription>

                    <div className="space-y-6">
                        {member.skills && member.skills.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    <Sparkles size={14} /> Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="outline"
                                            className="bg-primary/5 hover:bg-primary/10 transition-colors"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {member.achievements && member.achievements.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    <Award size={14} /> Achievements
                                </h4>
                                <ul className="space-y-2">
                                    {member.achievements.map((achievement) => (
                                        <li
                                            key={achievement}
                                            className="flex items-center gap-2 text-sm text-foreground/80"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DialogContent>
    );
};

// --- Main Component ---

const TeamPremium = ({
    members = defaultMembers,
    title = "Architects of the Future",
    description = "We've assembled a team of innovators, dreamers, and doers to build the next generation of digital experiences.",
    className,
}: TeamBlockProps) => {
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(
        null
    );

    return (
        <section
            className={cn("py-32 bg-background relative overflow-hidden", className)}
        >
            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-20">
                    <Badge
                        variant="outline"
                        className="mb-4 px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5"
                    >
                        World Class Talent
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        {title.includes("Future") ? (
                            <>
                                Architects of the{" "}
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-500">
                                    Future
                                </span>
                            </>
                        ) : (
                            title
                        )}
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member) => (
                        <Dialog
                            key={member.id}
                            onOpenChange={(open) => !open && setSelectedMember(null)}
                        >
                            <TeamMemberCard
                                member={member}
                                onClick={() => setSelectedMember(member)}
                            />
                            <TeamMemberDetails member={member} />
                        </Dialog>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { TeamPremium };

