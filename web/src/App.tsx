import { SpeedInsights } from "@vercel/speed-insights/react";
import { Clipboard, Github, Link2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";

interface ShortenResponse {
  shortUrl: string;
}

export function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const input = e.currentTarget.elements[0];

      if (input instanceof HTMLInputElement) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const longUrl = input.value;

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/shorten`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ longUrl }),
          }
        );

        const json: ShortenResponse = await response.json();

        setShortUrl(json.shortUrl);
        toast.success("url encurtada com sucesso");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function copyUrl() {
    window.navigator.clipboard.writeText(shortUrl);
    toast.success("copiado");
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">url-shortener</h1>

          <div className="flex items-center gap-3">
            <a href="https://github.com/soutowhs" target="_blank">
              <Button variant="outline" size="icon">
                <Github className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </a>
            <ModeToggle />
          </div>
        </div>

        <main className="flex-1 p-6 flex gap-6 justify-center items-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>be shortened 🔗</CardTitle>
              <CardDescription>
                serviço para gerar links curtos a partir de URLs longas
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      type="url"
                      name="longUrl"
                      placeholder="insira a url"
                    />
                  </div>
                  {shortUrl && (
                    <div className="gap-4 text-center align-middle justify-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={copyUrl}
                        className="text-muted-foreground"
                      >
                        <Clipboard className="w-4 h-4 mr-2" />
                        <span className="block text-sm ">{shortUrl}</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex">
                <Button disabled={isLoading} className="w-full">
                  {!isLoading && (
                    <>
                      encurtar <Link2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                  {isLoading && (
                    <LoaderCircle className="w-6 h-6 animate-spin" />
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
      <Toaster />
      <SpeedInsights />
    </ThemeProvider>
  );
}
