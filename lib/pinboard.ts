interface PinboardResponse {
  date: string;
  user: string;
  posts: PinboardPost[];
}

interface PinboardPost extends PinboardPostPrepared {
  meta: string;
  hash: string;
  shared: 'yes' | 'no';
  toread: 'yes' | 'no';
  tags: string;
}

export interface PinboardPostPrepared {
  href: string;
  description: string;
  extended: string;
  time: string;
}

const preparePinboardPins = (pin: PinboardPost): PinboardPostPrepared => ({
  href: pin.href,
  description: pin.description,
  extended: pin.extended,
  time: pin.time,
});

export const getAllPins = async (config: {
  AUTH_TOKEN?: string;
}): Promise<PinboardPostPrepared[]> => {
  if (!config.AUTH_TOKEN) {
    throw new Error('AUTH_TOKEN is required');
  }

  const res = await fetch(
    `https://api.pinboard.in/v1/posts/recent?auth_token=${config.AUTH_TOKEN}&format=json&count=100&tag=site-feed`
  );

  const json = (await res.json()) as PinboardResponse;

  const pins = json.posts.map(preparePinboardPins);

  return pins;
};
