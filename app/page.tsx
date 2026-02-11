import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ImageIcon, Video, Users, CreditCard, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AI Influencer</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-white hover:text-white/80">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-purple-500 hover:bg-purple-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Create AI Influencers
          <span className="block text-purple-400">That Captivate</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Generate consistent AI characters, stunning images, and engaging videos. 
          Build your digital brand with our powerful creation tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-lg px-8">
              Start Creating Free
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8">
              Learn More
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">80+</div>
            <div className="text-gray-400">Free Daily Credits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">8</div>
            <div className="text-gray-400">Art Styles</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">Instant</div>
            <div className="text-gray-400">Generation</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Everything You Need to Create
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Character Creation"
            description="Create unique AI influencers with detailed customization options for appearance and personality."
          />
          <FeatureCard
            icon={<ImageIcon className="h-8 w-8" />}
            title="AI Image Generation"
            description="Generate stunning images from text prompts with multiple artistic styles and consistent characters."
          />
          <FeatureCard
            icon={<Video className="h-8 w-8" />}
            title="Video Creation"
            description="Transform static images into engaging animated videos with adjustable motion and effects."
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="Face-Lock Technology"
            description="Maintain character consistency across all your generations with advanced face-locking features."
          />
          <FeatureCard
            icon={<CreditCard className="h-8 w-8" />}
            title="Flexible Pricing"
            description="Start free with 80 daily credits. Upgrade for more credits and premium features."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure & Private"
            description="Your creations are private by default. Control what you share with the community."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PricingCard
            name="Free"
            price="$0"
            credits="80"
            features={[
              "80 credits per day",
              "Image generation",
              "Basic art styles",
              "Watermarked outputs",
              "Community support",
            ]}
            highlighted={false}
          />
          <PricingCard
            name="Micro Influencer"
            price="$29"
            credits="1,000"
            features={[
              "1,000 credits per day",
              "Image & video generation",
              "All art styles",
              "No watermark",
              "Priority processing",
            ]}
            highlighted={true}
          />
          <PricingCard
            name="Macro Influencer"
            price="$79"
            credits="3,000"
            features={[
              "3,000 credits per day",
              "All generation types",
              "Face-swap features",
              "Talking avatars",
              "Priority support",
            ]}
            highlighted={false}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-purple-500/20 rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your AI Influencer?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join thousands of creators building the future of digital content. 
            Start free today.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-lg px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 AI Influencer Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function PricingCard({ name, price, credits, features, highlighted }: { 
  name: string; 
  price: string; 
  credits: string;
  features: string[]; 
  highlighted: boolean;
}) {
  return (
    <div className={`rounded-xl p-6 ${highlighted ? 'bg-purple-500/20 border-2 border-purple-500' : 'bg-white/5 border border-white/10'}`}>
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <div className="text-purple-400 font-medium mb-4">{credits} credits/day</div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/auth/signup">
        <Button className={`w-full ${highlighted ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 hover:bg-white/20'}`}>
          Get Started
        </Button>
      </Link>
    </div>
  )
}
