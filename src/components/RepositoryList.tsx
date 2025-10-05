import { Card } from "@/components/ui/card";
import { Star, GitFork, Circle } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList = ({ repositories }: RepositoryListProps) => {
  if (!repositories || repositories.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/50">
      <h2 className="text-2xl font-bold mb-6">Top Repositories</h2>
      <div className="space-y-4">
        {repositories.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {repo.name}
                </h3>
                {repo.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <Circle className="h-3 w-3 fill-accent text-accent" />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default RepositoryList;
