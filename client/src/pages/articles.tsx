import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Eye } from "lucide-react";

export default function Articles() {
  const articles = [
    {
      id: 1,
      title: "The Spiritual Essence of Varanasi: Why Every Seeker Must Visit",
      excerpt: "Varanasi is not just a city – it's the soul of spirituality. From the holy Ganga to sacred temples, every corner tells a spiritual story.",
      content: "Discover why this ancient city continues to draw pilgrims from around the world and how it can transform your spiritual journey.",
      author: "Pandit Raj Kumar Sharma",
      publishDate: "December 15, 2024",
      readTime: "5 min read",
      category: "Spirituality",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 1250
    },
    {
      id: 2,
      title: "Mahashivratri in Varanasi: A Night of Divine Power and Devotion",
      excerpt: "Mahashivratri in Varanasi – A Night of Divine Union and Devotion. Varanasi, the spiritual capital of India, comes alive during this sacred celebration.",
      content: "Experience the most powerful night of the year when devotees gather to honor Lord Shiva in the city closest to his heart.",
      author: "Dr. Priya Shastri",
      publishDate: "December 18, 2024",
      readTime: "7 min read",
      category: "Festivals",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 980
    },
    {
      id: 3,
      title: "Dev Deepawali in Varanasi: When the Gods Descend and the Ghats Illuminate",
      excerpt: "Experience the magical festival when thousands of diyas light up the Varanasi ghats, creating a celestial spectacle on earth.",
      content: "Learn about the significance of this unique festival and how to experience it in its full spiritual glory.",
      author: "Sita Devi",
      publishDate: "December 20, 2024",
      readTime: "6 min read",
      category: "Festivals",
      image: "https://images.unsplash.com/photo-1604575896549-78dea04eb0a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 1450
    },
    {
      id: 4,
      title: "Manikarnika Ghat: The Eternal Flame of Varanasi",
      excerpt: "Understand the profound significance of Manikarnika Ghat, where the cycle of life and death reveals the ultimate truth.",
      content: "Explore the spiritual philosophy behind this sacred burning ghat and its role in the Hindu understanding of moksha.",
      author: "Amit Kumar",
      publishDate: "December 22, 2024",
      readTime: "8 min read",
      category: "Sacred Places",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 850
    },
    {
      id: 5,
      title: "The Sacred Art of Pind Daan: Honoring Our Ancestors",
      excerpt: "Learn about the ancient ritual of Pind Daan and how it helps souls attain peace while bringing closure to families.",
      content: "A comprehensive guide to understanding and performing this sacred ceremony with proper reverence and authenticity.",
      author: "Pandit Raj Kumar Sharma",
      publishDate: "December 25, 2024",
      readTime: "10 min read",
      category: "Rituals",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 1120
    },
    {
      id: 6,
      title: "Kedarnath: Journey to Lord Shiva's Abode in the Himalayas",
      excerpt: "Embark on a spiritual journey to one of the twelve Jyotirlingas, nestled high in the Himalayan peaks.",
      content: "Discover the significance of this sacred pilgrimage and practical tips for a transformative journey to Kedarnath.",
      author: "Ravi Shankar",
      publishDate: "December 28, 2024",
      readTime: "9 min read",
      category: "Pilgrimage",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 2100
    }
  ];

  const categories = ["All", "Spirituality", "Festivals", "Sacred Places", "Rituals", "Pilgrimage"];

  return (
    <div className="min-h-screen bg-background py-20" data-testid="articles-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="articles-title">
            Spiritual Articles & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="articles-description">
            Explore the depths of spirituality through our carefully curated articles on sacred traditions, rituals, and pilgrimage experiences
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="mb-2"
              data-testid={`category-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <img 
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <CardContent className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-3 bg-primary text-white">Featured Article</Badge>
              <h2 className="text-2xl font-bold text-card-foreground mb-3">{articles[0].title}</h2>
              <p className="text-muted-foreground mb-4">{articles[0].excerpt}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">{articles[0].author}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-4">{articles[0].publishDate}</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{articles[0].readTime}</span>
              </div>
              <Button className="w-fit" data-testid={`read-article-${articles[0].id}`}>
                Read Full Article
              </Button>
            </CardContent>
          </div>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`article-card-${article.id}`}>
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300";
                }}
              />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="w-3 h-3 mr-1" />
                    <span>{article.views}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <User className="w-3 h-3 mr-1" />
                  <span className="mr-3">{article.author}</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{article.publishDate}</span>
                  <Button size="sm" variant="outline" data-testid={`read-article-${article.id}`}>
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stay Connected to Spiritual Wisdom</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest spiritual insights, festival updates, and pilgrimage guides directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              data-testid="newsletter-email-input"
            />
            <Button className="bg-primary hover:bg-accent" data-testid="newsletter-subscribe">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
