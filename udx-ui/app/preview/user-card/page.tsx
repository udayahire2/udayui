import { UserCard } from "@/components/blocks/UserCard";

export default function UserCardPreview() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">User Card</h2>
                <p className="text-slate-600 dark:text-slate-400">
                    A composite card component for displaying user profiles.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Default State</h3>
                    <UserCard />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Online Status</h3>
                    <UserCard
                        name="Alice Smith"
                        role="Product Designer"
                        isOnline={true}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Custom Content</h3>
                    <UserCard
                        name="Bob Johnson"
                        role="DevOps Engineer"
                    />
                </div>
            </div>
        </div>
    );
}
