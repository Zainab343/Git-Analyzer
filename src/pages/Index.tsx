import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Github, GitBranch, Star, Code } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProfileHeader from "@/components/ProfileHeader";
import StatsCard from "@/components/StatsCard";
import LanguageChart from "@/components/LanguageChart";
import RepositoryList from "@/components/RepositoryList";
import { toast } from "sonner";

const Index = () => {
  const [username, setUsername] = useState("");
  const [searchedUsername, setSearchedUsername] = useState("");

  const { data: userData, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["github-user", searchedUsername],
    queryFn: async () => {
      if (!searchedUsername) return null;
      const response = await fetch(`https://api.github.com/users/${searchedUsername}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    },
    enabled: !!searchedUsername,
  });

  const { data: reposData, isLoading: reposLoading } = useQuery({
    queryKey: ["github-repos", searchedUsername],
    queryFn: async () => {
      if (!searchedUsername) return null;
      const response = await fetch(
        `https://api.github.com/users/${searchedUsername}/repos?sort=stars&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      return response.json();
    },
    enabled: !!searchedUsername,
  });

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
    setSearchedUsername(newUsername);
  };

  if (userError) {
    toast.error("User not found. Please try another username.");
  }

  const languageData = reposData
    ? Object.entries(
        reposData.reduce((acc: Record<string, number>, repo: any) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {})
      )
        .map(([name, value]) => ({ name, value: value as number }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)
    : [];

  const totalStars = reposData
    ? reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
    : 0;

  const isLoading = userLoading || reposLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="text-center space-y-6 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GitHub Analyzer
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visualize and analyze any GitHub profile with beautiful charts and insights
            </p>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      {searchedUsername && (
        <div className="container mx-auto px-4 pb-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : userData ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Profile Header */}
              <ProfileHeader
                avatar_url={userData.avatar_url}
                name={userData.name}
                login={userData.login}
                bio={userData.bio}
                location={userData.location}
                blog={userData.blog}
                company={userData.company}
                followers={userData.followers}
                following={userData.following}
              />

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Public Repositories"
                  value={userData.public_repos}
                  icon={GitBranch}
                  iconColor="text-primary"
                />
                <StatsCard
                  title="Total Stars"
                  value={totalStars}
                  icon={Star}
                  iconColor="text-accent"
                />
                <StatsCard
                  title="Public Gists"
                  value={userData.public_gists}
                  icon={Code}
                  iconColor="text-primary"
                />
                <StatsCard
                  title="Followers"
                  value={userData.followers}
                  icon={Github}
                  iconColor="text-accent"
                />
              </div>

              {/* Charts and Repositories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {languageData.length > 0 && (
                  <LanguageChart languages={languageData} />
                )}
                {reposData && reposData.length > 0 && (
                  <RepositoryList repositories={reposData} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Index;
