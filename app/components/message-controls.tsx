import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Transcriber from '@/components/ui/transcriber';
import { Conversation, Message as MessageType } from '@types';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

function FilterControls({
  typeFilter,
  setTypeFilter,
  searchQuery,
  setSearchQuery,
  messageTypes,
  messages,
}: {
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  messageTypes: string[];
  messages: MessageType[];
}) {
  return (
    <div className="flex gap-4 mb-4">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          {messageTypes.map(type => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Search messages" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1" />
      <Button variant="outline" onClick={() => console.log(messages)}>
        <Terminal />
        Log to Console
      </Button>
    </div>
  );
}

export function MessageControls({ conversation, msgs }: { conversation: Conversation[]; msgs: MessageType[] }) {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (conversation.length === 0) return null;

  // Get unique message types
  const messageTypes = ['all', ...new Set(msgs.map(msg => msg.type))];

  console.dir(msgs);
  // Filter messages based on type and search query
  const filteredMsgs = msgs.filter(msg => {
    const matchesType = typeFilter === 'all' || msg.type === typeFilter;
    const matchesSearch = searchQuery === '' || JSON.stringify(msg).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Conversation Logs</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View Logs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full p-4 mx-auto overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Log to Console</DialogTitle>
            </DialogHeader>
            <FilterControls
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              messageTypes={messageTypes}
              messages={filteredMsgs}
            />
            <div className="mt-4">
              <ScrollArea className="h-[80vh]">
                <Table className="max-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Content</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMsgs.map((msg, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{msg.type}</TableCell>
                        <TableCell className="font-mono text-sm whitespace-pre-wrap break-words max-w-full]">
                          {JSON.stringify(msg, null, 2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Transcriber conversation={conversation.slice(-1)} />
    </div>
  );
}
