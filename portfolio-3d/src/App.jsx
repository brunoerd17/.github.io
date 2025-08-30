import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mail, Phone, Instagram, ChevronDown, Home, Building2, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Carregar dados dos projetos
    import('./assets/projects_data.json')
      .then(data => {
        const processedProjects = data.default.map(project => ({
          ...project,
          images: project.images.map(imagePath => {
            const filename = imagePath.split('/').pop()
            return `/src/assets/${filename}`
          })
        }))
        setProjects(processedProjects)
      })
      .catch(error => console.error('Erro ao carregar projetos:', error))
  }, [])

  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const categories = ['Todos', 'Interiores', 'Exteriores']

  const openLightbox = (project, imageIndex = 0) => {
    setSelectedProject(project)
    setCurrentImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Bruno Erdmanns</h1>
                <p className="text-sm text-slate-600">Arquitetura & Design 3D</p>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#portfolio" className="text-slate-700 hover:text-blue-600 transition-colors">Portfólio</a>
              <a href="#contato" className="text-slate-700 hover:text-blue-600 transition-colors">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Visualizações 3D
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Extraordinárias
              </span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Transformo ideias em realidade através de renderizações 3D fotorrealísticas 
              para arquitetura e design de interiores.
            </p>
            <Button 
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Portfólio
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Meu Portfólio</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore uma seleção dos meus melhores trabalhos em visualização 3D
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-full p-1 shadow-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className={`rounded-full px-6 py-2 mx-1 transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {category === 'Interiores' && <Home className="w-4 h-4 mr-2" />}
                  {category === 'Exteriores' && <Building2 className="w-4 h-4 mr-2" />}
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 shadow-lg">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <Button
                          onClick={() => openLightbox(project, 0)}
                          className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Projeto
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge 
                        variant="secondary" 
                        className={`mb-3 ${
                          project.category === 'Interiores' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {project.category}
                      </Badge>
                      <h4 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {project.images.length} {project.images.length === 1 ? 'imagem' : 'imagens'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Entre em Contato</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pronto para dar vida ao seu projeto? Vamos conversar!
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
              >
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">Email</h4>
                <a 
                  href="mailto:bruno.erd17@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  bruno.erd17@gmail.com
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl"
              >
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">Telefone</h4>
                <a 
                  href="tel:+5553991888391" 
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  (53) 99188-8391
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl"
              >
                <Instagram className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">Instagram</h4>
                <a 
                  href="https://instagram.com/bruno.erdmanns" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  @bruno.erdmanns
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Bruno Erdmanns. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {selectedProject.images.length > 1 && (
                  <>
                    <Button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                    >
                      ←
                    </Button>
                    <Button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                    >
                      →
                    </Button>
                  </>
                )}
                
                <Button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                >
                  ✕
                </Button>
              </div>
              
              <div className="p-6">
                <Badge 
                  variant="secondary" 
                  className={`mb-3 ${
                    selectedProject.category === 'Interiores' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {selectedProject.category}
                </Badge>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {selectedProject.title}
                </h3>
                {selectedProject.images.length > 1 && (
                  <p className="text-slate-600">
                    Imagem {currentImageIndex + 1} de {selectedProject.images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

