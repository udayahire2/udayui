import { DefaultNavbar } from "@/components/blocks";
import { UDXLogo } from "@/components/ui/udx-logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* DefaultNavbar with smooth animations, sticky header, and responsive design */}
      <DefaultNavbar
        variant="normal"
        logo={<UDXLogo className="w-5 h-5 text-foreground" />}
        logoText="UDX UI"
        anchor="Home,About,Services,Contact"
        button="Sign In,Try Free,Get Started"
        showThemeToggle={true}
      />

      {/* Demo Content for Scrolling Testing */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-16">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to UDX UI Library
            </h2>
            <p className="text-lg text-muted-foreground">
              A curated collection of React components with Simple, Normal, and
              Premium variants. Built with Shadcn UI and Tailwind CSS.
            </p>
            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg border">
              <p className="font-semibold mb-2">
                DefaultNavbar Usage Examples:
              </p>
              <code className="block text-xs overflow-x-auto whitespace-pre">
                {`// DefaultNavbar with anchor links and action buttons
<DefaultNavbar 
  variant="rounded"
  anchor="Home,About,Services,Contact"
  button="Sign In,Get Started"
  showThemeToggle={true}
/>

// DefaultNavbar with custom navigation and buttons
<DefaultNavbar 
  variant="rounded"
  navItems={[
    { name: "Home", href: "/" },
    { name: "Docs", href: "/docs" }
  ]}
  button="Login,Subscribe"
/>

// Simple DefaultNavbar with just anchor links
<DefaultNavbar 
  variant="rounded"
  anchor="Features,Pricing,Blog"
/>

// DefaultNavbar with dots menu (default actions)
<DefaultNavbar 
  variant="normal"
  anchor="Home,About,Contact"
  actions="dots"
/>`}
              </code>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">
              Section 1: Getting Started
            </h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Section 2: Components</h3>
            <p className="text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Section 3: Features</h3>
            <p className="text-muted-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Section 4: More Content</h3>
            <p className="text-muted-foreground">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores. Eos qui ratione
              voluptatem sequi nesciunt neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">
              Section 5: Advanced Usage
            </h3>
            <p className="text-muted-foreground">
              Consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Section 6: Customization</h3>
            <p className="text-muted-foreground">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur. Vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur consectetur adipisci velit sed
              quia non numquam.
            </p>
          </section>

          <section className="space-y-4 pb-16">
            <h3 className="text-2xl font-semibold">
              Section 7: Final Thoughts
            </h3>
            <p className="text-muted-foreground">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti. Quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
