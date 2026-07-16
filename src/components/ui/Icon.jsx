import {
  CalendarDays,
  HandHeart,
  Mail,
  Vote,
  UserPlus,
  SearchCheck,
  Mailbox,
  Landmark,
  MapPin,
  Users,
  Megaphone,
  DoorOpen,
  Phone,
  Tent,
  ClipboardCheck,
  Laptop,
  Coffee,
} from "lucide-react";

// Maps the string names used in /data files to lucide icon components.
const registry = {
  CalendarDays,
  HandHeart,
  Mail,
  Vote,
  UserPlus,
  SearchCheck,
  Mailbox,
  Landmark,
  MapPin,
  Users,
  Megaphone,
  DoorOpen,
  Phone,
  Tent,
  ClipboardCheck,
  Laptop,
  Coffee,
};

export function Icon({ name, ...props }) {
  const Cmp = registry[name] || CalendarDays;
  return <Cmp aria-hidden="true" {...props} />;
}
