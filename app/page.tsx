import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ImageIcon, Video, Users, CreditCard, Shield, ArrowRight, Zap, Globe, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-75" />
              <div className="relative bg-slate-900 rounded-lg p-2">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AI Influencer
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-24 md:py-32 text-center">
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8 hover:border-purple-500/40 transition-all cursor-pointer">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-slate-300">Powered by cutting-edge AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Create AI Influencers
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              That Captivate
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Generate consistent AI characters, stunning images, and engaging videos.
            <br className="hidden md:block" />
            Build your digital brand with our powerful creation tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 text-lg px-10 py-6 group">
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-slate-600 transition-all text-lg px-10 py-6 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats - Bento Grid Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-20">
            <StatCard
              value="80+"
              label="Free Daily Credits"
              icon={<Zap className="h-5 w-5" />}
              gradient="from-purple-500/20 to-purple-600/20"
              border="border-purple-500/20"
            />
            <StatCard
              value="8"
              label="Art Styles"
              icon={<Sparkles className="h-5 w-5" />}
              gradient="from-pink-500/20 to-pink-600/20"
              border="border-pink-500/20"
            />
            <StatCard
              value="Instant"
              label="Generation"
              icon={<Globe className="h-5 w-5" />}
              gradient="from-blue-500/20 to-blue-600/20"
              border="border-blue-500/20"
            />
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="relative container mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Create stunning AI content with our comprehensive suite of tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Large featured card */}
          <FeatureCardLarge
            icon={<Users className="h-10 w-10" />}
            title="Character Creation"
            description="Create unique AI influencers with detailed customization options for appearance and personality."
            gradient="from-purple-500/20 to-purple-600/10"
            span={2}
          />
          <FeatureCard
            icon={<ImageIcon className="h-8 w-8" />}
            title="AI Image Generation"
            description="Generate stunning images from text prompts with multiple artistic styles."
            gradient="from-pink-500/20 to-pink-600/10"
          />
          <FeatureCard
            icon={<Video className="h-8 w-8" />}
            title="Video Creation"
            description="Transform static images into engaging animated videos with adjustable motion."
            gradient="from-blue-500/20 to-blue-600/10"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="Face-Lock Technology"
            description="Maintain character consistency across all your generations."
            gradient="from-violet-500/20 to-violet-600/10"
          />
          <FeatureCard
            icon={<CreditCard className="h-8 w-8" />}
            title="Flexible Pricing"
            description="Start free with 80 daily credits. Upgrade for more credits."
            gradient="from-fuchsia-500/20 to-fuchsia-600/10"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure & Private"
            description="Your creations are private by default. Control what you share."
            gradient="from-indigo-500/20 to-indigo-600/10"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative container mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your creative needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ModernPricingCard
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
          <ModernPricingCard
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
          <ModernPricingCard
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
      <section className="relative container mx-auto px-6 py-32">
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl rounded-3xl" />
          <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

            <h2 className="relative text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Ready to Create Your AI Influencer?
              </span>
            </h2>
            <p className="relative text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of creators building the future of digital content.
              <br />
              Start free today.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 text-lg px-12 py-6 group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-75" />
                <div className="relative bg-slate-900 rounded-lg p-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                AI Influencer
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; 2024 AI Influencer Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatCard({ value, label, icon, gradient, border }: {
  value: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  border: string;
}) {
  return (
    <div className={`
      relative group bg-gradient-to-br ${gradient} backdrop-blur-sm
      border ${border} rounded-2xl p-6
      hover:scale-105 transition-all duration-300
    `}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-purple-400`}>
          {icon}
        </div>
        <div className="text-left">
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
          <div className="text-slate-400 text-sm">{label}</div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className={`
      relative group bg-gradient-to-br from-slate-900/80 to-slate-950/80
      backdrop-blur-xl border border-white/5 rounded-2xl p-8
      hover:scale-[1.02] hover:border-white/10
      transition-all duration-300
      overflow-hidden
    `}>
      {/* Gradient glow on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient} opacity-0
        group-hover:opacity-100 transition-opacity duration-300
      `} />
      <div className="relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-purple-400 mb-6 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function FeatureCardLarge({ icon, title, description, gradient, span }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  span: number;
}) {
  return (
    <div className={`
      relative md:col-span-${span} group bg-gradient-to-br from-slate-900/80 to-slate-950/80
      backdrop-blur-xl border border-white/5 rounded-2xl p-8
      hover:scale-[1.02] hover:border-white/10
      transition-all duration-300 overflow-hidden
    `}>
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient} opacity-0
        group-hover:opacity-100 transition-opacity duration-300
      `} />
      <div className="relative z-10">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} text-purple-400 mb-6 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  )
}

function ModernPricingCard({ name, price, credits, features, highlighted }: {
  name: string;
  price: string;
  credits: string;
  features: string[];
  highlighted: boolean;
}) {
  return (
    <div className={`
      relative group
      ${highlighted
        ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 scale-105'
        : 'bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/5'
      }
      backdrop-blur-xl rounded-3xl p-8
      hover:scale-[1.02] transition-all duration-300 overflow-hidden
    `}>
      {/* Glow effect */}
      {highlighted && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl" />
        </>
      )}

      <div className="relative z-10">
        <h3 className={`text-xl font-semibold mb-2 ${highlighted ? 'text-white' : 'text-slate-300'}`}>
          {name}
        </h3>
        <div className="mb-6">
          <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-slate-200'}`}>
            {price}
          </span>
          <span className="text-slate-500 ml-2">/month</span>
        </div>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          highlighted
            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            : 'bg-white/5 text-slate-400 border border-white/10'
        } mb-6`}>
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">{credits} credits/day</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className={`text-sm flex items-center gap-3 ${
              highlighted ? 'text-slate-200' : 'text-slate-400'
            }`}>
              <div className={`p-1 rounded-full ${
                highlighted
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-white/5 text-slate-500'
              }`}>
                <Sparkles className="h-3 w-3" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/auth/signup" className="block">
          <Button className={`
            w-full transition-all duration-300
            ${highlighted
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
              : 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white'
            }
          `}>
            {highlighted ? 'Get Started' : 'Get Started'}
          </Button>
        </Link>
      </div>
    </div>
  )
}
