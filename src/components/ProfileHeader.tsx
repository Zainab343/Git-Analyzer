import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Link as LinkIcon, Users, Building } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProfileHeaderProps {
  avatar_url: string;
  name: string;
  login: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  following: number;
}

const ProfileHeader = ({
  avatar_url,
  name,
  login,
  bio,
  location,
  blog,
  company,
  followers,
  following,
}: ProfileHeaderProps) => {
  return (
    <Card className="p-6 md:p-8 bg-gradient-card backdrop-blur-xl border-border/50">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-primary/20">
          <AvatarImage src={avatar_url} alt={name} />
          <AvatarFallback>{name?.[0] || login[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {name || login}
            </h1>
            <p className="text-muted-foreground text-lg">@{login}</p>
          </div>
          
          {bio && (
            <p className="text-foreground/90 text-lg leading-relaxed">{bio}</p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {company && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>{company}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            {blog && (
              <a
                href={blog.startsWith('http') ? blog : `https://${blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <LinkIcon className="h-4 w-4" />
                <span>{blog}</span>
              </a>
            )}
          </div>
          
          <div className="flex gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold">{followers.toLocaleString()}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{following.toLocaleString()}</span>
              <span className="text-muted-foreground">following</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
