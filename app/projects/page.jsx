"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

// Dummy project data
const dummyProjects = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  summary: `This is a short summary for Project ${i + 1}.`,
  thumbnail: i % 2 === 0 ? `https://picsum.photos/seed/${i + 1}/400/250` : null,
}));

export default function ProjectsPage() {
  const [projects, setProjects] = useState(dummyProjects);

  const handleCreateProject = () => {
    // Later: open create project modal or navigate
    alert("Create Project clicked!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 pt-20 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Button
          onClick={handleCreateProject}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600"
        >
          <Plus size={18} />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer border border-gray-800 bg-gray-900/80 shadow-lg transition-transform duration-200 hover:scale-105"
            onClick={() => alert(`Go to details for ${project.title}`)}
          >
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={400}
                height={250}
                className="h-48 w-full rounded-t-lg object-cover"
              />
            )}
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">{project.summary}</p>
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              Click to view details
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
