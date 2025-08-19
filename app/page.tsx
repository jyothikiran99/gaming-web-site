"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D, Center } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Users, Zap, Star, Play, Search } from "lucide-react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function FloatingGamepad() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 1, 0.3]} />
        <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, 0.2, 0.16]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <mesh position={[0.4, 0.2, 0.16]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <div className="w-full h-screen absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

          <Center>
            <Text3D font="/fonts/Geist_Bold.json" size={0.8} height={0.1} position={[0, 2, -2]}>
              GAMEVERSE
              <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
            </Text3D>
          </Center>

          <FloatingGamepad />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default function GameVersePage() {
  const [email, setEmail] = useState("")

  const featuredGames = [
    { title: "Cyber Nexus", genre: "RPG", rating: 4.9, players: "2.1M" },
    { title: "Quantum Strike", genre: "FPS", rating: 4.8, players: "1.8M" },
    { title: "Mystic Realms", genre: "Adventure", rating: 4.7, players: "1.5M" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Scene3D />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">GameVerse</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#games" className="text-foreground hover:text-primary transition-colors">
            Games
          </a>
          <a href="#tournaments" className="text-foreground hover:text-primary transition-colors">
            Tournaments
          </a>
          <a href="#community" className="text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors">
            Leaderboard
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Join Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6">Enter the Future</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience gaming like never before with immersive 3D worlds, competitive tournaments, and a thriving
            community of players.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="gradient-border flex-1 w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-0 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
              <Play className="mr-2 h-4 w-4" />
              Start Gaming
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Active Players", value: "5.2M+" },
              { icon: Trophy, label: "Tournaments", value: "1,200+" },
              { icon: Gamepad2, label: "Games", value: "850+" },
              { icon: Zap, label: "Matches Daily", value: "50K+" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="flex flex-col items-center p-6">
                  <stat.icon className="h-8 w-8 text-primary mb-2" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section id="games" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">Featured Games</h2>
            <p className="text-xl text-muted-foreground">Discover the most popular games in our universe</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 transform hover:scale-105 group"
              >
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                    <Gamepad2 className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="gradient-text">{game.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mb-2">
                      {game.genre}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{game.players} players</div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 py-20 px-6 bg-card/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold gradient-text mb-8">Find Your Next Adventure</h2>
          <div className="gradient-border max-w-2xl mx-auto">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search games, tournaments, players..."
                className="bg-background border-0 text-foreground placeholder:text-muted-foreground rounded-r-none"
              />
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gamepad2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold gradient-text">GameVerse</span>
              </div>
              <p className="text-muted-foreground">The ultimate gaming universe where legends are born.</p>
            </div>

            {[
              { title: "Games", links: ["Action", "RPG", "Strategy", "Sports"] },
              { title: "Community", links: ["Forums", "Discord", "Events", "Leaderboards"] },
              { title: "Support", links: ["Help Center", "Contact", "Bug Reports", "Feedback"] },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 GameVerse. All rights reserved. Built with cutting-edge technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
