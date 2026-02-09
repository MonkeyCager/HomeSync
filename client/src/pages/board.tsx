import { useState } from "react";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Circle,
  File,
  Download,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_BOARD } from "@/lib/data";

export default function BoardPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-10 h-full flex flex-col">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Collaboration Board</h1>
          <p className="text-muted-foreground mt-1">Share notes, tasks, and documents with your agent.</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Note title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Write your note here..." />
                </div>
              </div>
              <DialogFooter>
                <Button>Save Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task</Label>
                  <Input id="task-title" placeholder="What needs to be done?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Board Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
        
        {/* Notes Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h3 className="font-semibold text-foreground flex items-center gap-2">
               <span className="bg-yellow-100 text-yellow-700 p-1.5 rounded-md"><FileText className="h-4 w-4" /></span>
               Notes
             </h3>
             <Badge variant="secondary" className="rounded-full px-2">2</Badge>
          </div>
          
          <div className="space-y-3">
            {MOCK_BOARD.notes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-yellow-400">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                  <CardTitle className="text-base font-bold leading-tight">{note.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="ghost" className="w-full border border-dashed border-border text-muted-foreground h-12">
              <Plus className="h-4 w-4 mr-2" /> Add another note
            </Button>
          </div>
        </div>

        {/* Tasks Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h3 className="font-semibold text-foreground flex items-center gap-2">
               <span className="bg-primary/10 text-primary p-1.5 rounded-md"><CheckCircle2 className="h-4 w-4" /></span>
               Tasks
             </h3>
             <Badge variant="secondary" className="rounded-full px-2">3</Badge>
          </div>
          
          <div className="space-y-3">
            {MOCK_BOARD.tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow group">
                <CardContent className="p-4 flex items-start gap-3">
                  <button className="mt-0.5 text-muted-foreground hover:text-primary transition-colors">
                    {task.status === "Done" ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm font-medium ${task.status === "Done" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={task.status === "Done" ? "secondary" : task.status === "In Progress" ? "default" : "outline"} className="text-[10px] h-5 px-1.5 rounded-sm">
                        {task.status}
                      </Badge>
                      {task.date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {task.date}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="ghost" className="w-full border border-dashed border-border text-muted-foreground h-12">
              <Plus className="h-4 w-4 mr-2" /> Add another task
            </Button>
          </div>
        </div>

        {/* Documents Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h3 className="font-semibold text-foreground flex items-center gap-2">
               <span className="bg-blue-100 text-blue-700 p-1.5 rounded-md"><File className="h-4 w-4" /></span>
               Documents
             </h3>
             <Badge variant="secondary" className="rounded-full px-2">3</Badge>
          </div>
          
          <div className="space-y-3">
             {MOCK_BOARD.documents.map((doc) => (
               <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                 <CardContent className="p-3 flex items-center gap-3">
                   <div className="h-10 w-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                     <FileText className="h-5 w-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium truncate">{doc.title}</p>
                     <p className="text-xs text-muted-foreground">{doc.date}</p>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                     <ExternalLink className="h-4 w-4" />
                   </Button>
                 </CardContent>
               </Card>
             ))}
             
             <Button variant="ghost" className="w-full border border-dashed border-border text-muted-foreground h-12">
               <Plus className="h-4 w-4 mr-2" /> Upload document
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
}